import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>  
  post: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore) {    
    this.postsCollection = this.afs.collection('posts', ref =>
  ref.orderBy('published','desc'))
  }

  getPosts(){
    return this.postsCollection.snapshotChanges().map(actions =>{
      return actions.map( a =>{
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return {id, ...data}
      })
    })
  }

  getPost(id:string):Observable<Post>{
    this.post = this.afs.doc<Post>(`posts/${id}`);
    return this.post.valueChanges();    
  }

  create(post){
    this.postsCollection.add(post);
  }

  delete(id:string){    
    return this.afs.doc<Post>(`posts/${id}`).delete();
  }

  update(id:string, formData){
    return this.afs.doc<Post>(`posts/${id}`).update(formData);
  }
}
