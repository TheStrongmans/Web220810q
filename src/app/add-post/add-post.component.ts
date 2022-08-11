import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayload } from './post-payload';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private addpostService: AddPostService, private router: Router) {
      this.addPostForm = new FormGroup({
        title: this.title,
        body: this.body
      });
      this.postPayload = {
        id: '',
        content: '',
        title: '',
        username: ''
      }
   }

  ngOnInit(): void {
  }

  addPost(){
    this.postPayload.content = this.addPostForm.get("body")?.value;
    this.postPayload.title = this.addPostForm.get('title')?.value;
  
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      console.log('发表文章成功');
      this.router.navigateByUrl('/');
    }, error => {
      console.log('失效响应');
    })
  }

}
