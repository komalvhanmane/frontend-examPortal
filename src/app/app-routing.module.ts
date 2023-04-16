import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuizQuestionsComponent } from './pages/admin/add-quiz-questions/add-quiz-questions.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizQuestionsComponent } from './pages/admin/update-quiz-questions/update-quiz-questions.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadQuizzesComponent } from './pages/user/load-quizzes/load-quizzes.component';
import { PostquizComponent } from './pages/user/postquiz/postquiz.component';
import { PrequizComponent } from './pages/user/prequiz/prequiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashBoardComponent } from './pages/user/user-dash-board/user-dash-board.component';
import { AdminGuard } from './services/admin.guard';
import { ProfileGuard } from './services/profile.guard';
import { UserGuard } from './services/user.guard';
import { ConfirmDeactivateGuard } from './services/confirm-deactivate.guard';

const routes: Routes = [

  //creates signup component url
  {
    path:'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full',
  },
  // {
  //   path:'**',
  //   component: HomeComponent,
  //   pathMatch: 'full',
  // },
  {
    path:'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],

    children :[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
      path:'profile',
      component:ProfileComponent,
      },
      {
        path:'view-categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-categories',
        component:AddCategoriesComponent,
      },
      {
        path:'view-quizzes',
        component:ViewQuizzesComponent,
      },
      {
        path:'add-quiz',
        component:AddQuizzesComponent,
      },
      {
        path:'quiz/:qId',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:id/:title',
        component:ViewQuizQuestionsComponent
      }
      ,
      {
        path:'add-questions/:id/:title',
        component:AddQuizQuestionsComponent
      },
      {
        path:'update-questions/:id/:title/:qid',
        component:UpdateQuizQuestionsComponent
      }
    ]
  },
  {
    path:'userDash',
    component: UserDashBoardComponent,
    canActivate:[UserGuard],
    children:[
      {
        path:':categoryId',
        component:LoadQuizzesComponent
      },
      {
        path:'instructions/:qid',
        component:PrequizComponent
      },
    ]

  },
  {
    path:"start/:qid",
    component:StartComponent,
    canActivate:[UserGuard],
    canDeactivate:[ConfirmDeactivateGuard]
  },
  {
    path:'postQuiz',
    component:PostquizComponent,
    canActivate:[UserGuard]
  },
  {
    path:"contact",
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
