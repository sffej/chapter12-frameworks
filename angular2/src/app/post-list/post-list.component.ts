import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs/Observable';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  subscription;
  posts: Array<Post>;

  constructor(private postsService: PostsService) {
    this.posts = [];
  }



  ngOnInit() {
    const postsSub: Observable<any> = this.postsService.getPosts();
    this.subscription = postsSub.subscribe((posts) => {
      if (posts.ok) {
        this.posts = posts.json();
      } else {
        this.posts = posts;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
