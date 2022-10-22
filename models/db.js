//#region checkindexdbsupporting
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

//#endregion checkindexdbsupporting

//#region createIndexDB
var baseName  = 'taskdb';
var storeName = 'tasksdb';

function connectDB(f){
	// Open (or create) the database
	var request = indexedDB.open(baseName, 1);
	request.onerror = function(e){
        console.log(e);
    }
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		var Db = e.currentTarget.result;
		
		//Create store
		if(!Db.objectStoreNames.contains(storeName)) {
			Db.createObjectStore(storeName, {keyPath: "id", autoIncrement:true});  
			//store.createIndex("NameIndex", ["name.last", "name.first"], { unique: false });
		}
		connectDB(f);
	}
}
//#endregion createIndexDB

function create(taskName, cb) {
    connectDB(function(db){
        var request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .add({ task_name: taskName });
        
        request.onsuccess = function(event) {
           cb(null, "Tasks Successfully saved!");
        };
        
        request.onerror = function(event) {
           cb('Something wrong!', null);
        }
    });
}

function readAll(cb) {
    connectDB(function(db){
        var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				cb(e.target.result, null);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					cb(null, rows);
				}
			};
    });
}

function updateTask(data, id, cb){
    connectDB((db)=>{
        var objectStore = db.transaction([storeName], "readwrite")
        .objectStore(storeName);

        const request = objectStore.get(id);
        request.onsuccess = function(event) {
            const task = request.result;

            // Change the name property
            task.task_name = data;

            // Create a request to update
            const updateRequest = objectStore.put(task);

            updateRequest.onsuccess = () => {
                cb(null, 'Updated task');
            }
        };
    });
}

function deleteTask(id, cb){
    connectDB((db)=>{
        var request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .delete(id);
        
        request.onsuccess = function(event) {
           cb(null, 'Deleted!');
        };
    });
    
}
