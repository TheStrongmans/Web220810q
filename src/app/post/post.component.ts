import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayload } from '../add-post/post-payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post!: PostPayload;
  permaLink!: Number;

  constructor(private router: ActivatedRoute, private postServic: AddPostService) { }

  ngOnInit(): void {
    this.router.params.subscribe( parms => {
      this.permaLink = parms['id'];
    });

    this.postServic.getPost(this.permaLink).subscribe( (data:PostPayload) => {
      console.log('post ts 响应成功');
      this.post = data;
    }, (err: any) => {
      console.log('post ts 响应失败');
    })
  }

}
