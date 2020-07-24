// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
//import 'firebase/firestore';
import 'firebase/storage';


class firebaseManager {
	constructor() {
		this.init();
	}

	onAuth(callback) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				callback(user);
			} else {
				callback({});
			}
		});
	}

	authenticate({provider, email, password, onSuccess, onError}) {
		switch (provider) {
			case 'GOOGLE':
				this.authenticateWithGoogle(onSuccess, onError);
				break;

			default:
				break;
		}
	}

	authenticateWithGoogle(onSuccess, onError) {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function (result) {
			onSuccess(result.user);
		}).catch(function (error) {
			onError(error);
		});
	}

	logout() {
		console.log("fireBasemanager:logout")
		firebase.auth().signOut();
	}

	init() {
		const firebaseConfig = {
			apiKey: "AIzaSyDmLbQN5f9TI-bYH1lTp_x-yhmpSZ_f-v8",
		  authDomain: "todobom.firebaseapp.com",
		  databaseURL: "https://todobom.firebaseio.com",
		  projectId: "todobom",
		  storageBucket: "todobom.appspot.com",
		  messagingSenderId: "299746404201",
		  appId: "1:299746404201:web:396740d5a16b155e95fff8",
		  measurementId: "G-24L2505296"
		};

		firebase.initializeApp(firebaseConfig);

		this.database = firebase.database();
		this.storage = firebase.storage();
	}

	// path - for ex - /questions/34567
	set(path, data, callback) {
		let ref = this.database.ref(path);
		ref.set(data,callback);
	}

	get(path, callback) {
		this.database.ref(path).once('value').then(snapshot => {
			callback(snapshot.val());
		});
	}

	remove(path)	{
		let ref = this.database.ref(path);
		ref.remove();
	}

	transaction(path,transactionUpdate){
		this.database.ref(path).transaction(transactionUpdate);
	}


	push(path, childOf, obj,callback){
			var listRef = this.database.ref(path).child(childOf);
			var newRef = listRef.push();
			const objWithKey = {...obj, id: newRef.key}
			newRef.set(objWithKey, callback);
	}

	pushKey(path, childOf, obj,callback){
			var listRef = this.database.ref(path);//.child(childOf);
			var newRef = listRef.push();
			const objWithKey = {...obj, id: newRef.key}
			newRef.set(objWithKey, ()=>callback(objWithKey));
	}

	orderByChild(path,orderByChild,equalTo,callback){
		const listRef = this.database.ref(path);
		const query = listRef.orderByChild(orderByChild).equalTo(equalTo)/*.limitToFirst(number)*/;
		query.once('value').then(snapshot => {
			callback(snapshot.val());
		});

	}

	checkFile({file,setLabel, setError, uploadFile,onDone}){
		var ref = this.storage.ref()
		var newPath = ref.child(`images/${file.name}`);
		newPath.getDownloadURL().then(downloadURL => {setError(`${file.name} already exists:`);setLabel(downloadURL);onDone({file,downloadURL})},
																							 error => {setError(`upload... ${file.name}`);uploadFile()});
	}
	uploadImage({file, setProgress,setLabel,onDone,setImageLocation})
	{
		var ref = this.storage.ref()
		var newPath = ref.child(`images/${file.name}`);
		var uploadTask = newPath.put(file);
		let percentLoaded = 0;

			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			uploadTask.on('state_changed', function(snapshot){
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					percentLoaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					setProgress(percentLoaded);
					//console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
						setLabel('Upload to DB has paused');
						break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
						setLabel(`Uploading ${file.name} to DB, ${percentLoaded}%`);
						break;
						default:
						setLabel(`loading ${file.name}`);
					}
					},
					function(error) {
							// Handle unsuccessful uploads
							setLabel(error)
					},
					function() {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						onDone({file,downloadURL});
						setImageLocation(downloadURL);
					});
					});


	}
}

export default firebaseManager;
