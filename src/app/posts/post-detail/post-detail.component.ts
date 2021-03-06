import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input() post:Post 
  editing: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService, 
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getPost()    
  }

  getPost(){    
    const id = this.route.snapshot.paramMap.get('id')
    return this.postService.getPost(id).subscribe(post => this.post = post)
  }  

  updatePost(){
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id,formData)
    this.editing = false;
  }

  delete(){
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id);
    this.router.navigate(['/posts']);
  }

}
