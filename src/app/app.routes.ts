import {Route} from '@angular/router';
import {OverzichtComponent} from './overzicht/overzicht.component';
import {ZoekgebiedComponent} from './zoekgebied/zoekgebied.component';
import {QuizComponent} from './quiz/quiz.component';

export const ROUTES: Route[] =
  [
    {
      path: '',
      component: OverzichtComponent
    },
    {
      path: 'overzicht',
      component: OverzichtComponent
    },
    {
      path: 'overzicht/:naam',
      component: OverzichtComponent
    },
    {
      path: 'zoekgebied',
      component: ZoekgebiedComponent
    },
    {
      path: 'quiz',
      component: QuizComponent
    },
    {
      path: '**',
      redirectTo: 'overzicht'
    }
  ];
