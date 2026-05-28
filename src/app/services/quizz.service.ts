import { Injectable } from '@angular/core';
import quizz_questions from '../../assets/data/quizz_questions.json';
import { Quizz } from '../models/quizz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  getQuizzData(): Quizz {
    return quizz_questions as Quizz;
  }

  async calculateResult(answers: string[]): Promise<string> {
    return answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
  }
}
