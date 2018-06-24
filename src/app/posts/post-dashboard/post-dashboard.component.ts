import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;  
  content: string; 
  image: string = null;
  buttonText: string = "create Post";
  uploadPercent: Observable<number>;
  downloarUrl: Observable<string>;

  constructor(
    private auth: AuthService, 
    private postService:PostService, 
    private storage: AngularFireStorage,
    private router:Router
  ) { }

  ngOnInit() {
  }

  createPost(){
    const post = {      
      uid: this.auth.currentUserId,
      user: this.auth.authState.displayName || this.auth.authState.email,
      title : this.title,
      content: this.content,
      image: this.image,
      published: new Date()
    };
    this.postService.create(post);
    this.title = '';
    this.content = '';
    this.buttonText = "Post Created";
    setTimeout(()=> (this.buttonText = "Create Post"),2000);
    this.router.navigate(['/posts']);
  }

  uploadImage(event){
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if(file.type.split('/')[0] !== 'image'){
      return alert('only image files');
    } else {
      const task = this.storage.upload(path,file);
      this.downloarUrl = task.downloadURL();
      this.uploadPercent = task.percentageChanges();      
      this.downloarUrl.subscribe(url => this.image = url)
    }

  }

}
