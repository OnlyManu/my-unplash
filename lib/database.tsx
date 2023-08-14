import { initializeApp } from "firebase/app";
import { getFirestore, query, where, doc, addDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IPicture } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyBXi0qChblmdjdhduVjvMTBdr5lbUgcUi8",
    authDomain: "myunplash-8aa80.firebaseapp.com",
    databaseURL: "https://myunplash-8aa80-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myunplash-8aa80",
    storageBucket: "myunplash-8aa80.appspot.com",
    messagingSenderId: "159890521245",
    appId: "1:159890521245:web:54c5d8fbe6b5d7cffaa874"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth()

export const addPicture = async (name: string, url: string): Promise<IPicture> => {
    try {
        const docRef = await addDoc(collection(db, "pictures"), {
            name: name,
            url: url
        })

        const picture: IPicture = {
            id: docRef.id,
            name: name,
            src: url
        }

        return picture
    } catch (error) {
        return {id: "error", name:"", src:""} as IPicture    
    }
}

export const deletePicture = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, "pictures", id))
        return true
    } catch (error) {
        return false
    }
}

export const getPictures = async(): Promise<Array<IPicture>> => {
    let result: Array<IPicture> = []
    const querySnapshot = await getDocs(collection(db, "pictures"));
    querySnapshot.forEach((doc) => {
        const picture: IPicture = {
            id: doc.id,
            name: doc.data().name,
            src: doc.data().url
        }
        result.push(picture)
    });
    return result
}

export const getPituresByName = async (name: string): Promise<Array<IPicture>> => {
    let pictures: Array<IPicture> = await getPictures()
    pictures = pictures.filter((picture) => {
        const reg = RegExp(`${name}`, "i")
        return reg.test(picture.name)
    })

    return pictures
}

export const verifyIfAdmin = async (password: string): Promise<boolean> => {
    const result = await signInWithEmailAndPassword(auth, "blimanuevil@gmail.com", password)
        .then(() => true)
        .catch(() => false)
    
    return result
}