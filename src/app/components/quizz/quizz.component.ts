import { Component, OnInit } from '@angular/core';
import { Question, Quizz } from '../../models/quizz.model';
import { QuizzService } from '../../services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: Question[] = [];
  questionSelected?: Question;
  answers: string[] = [];
  answerSelected: string = '';
  results: { [key: string]: string } = {};
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
  isCalculating: boolean = false;
  isTransitioning: boolean = false;
  isDarkMode: boolean = true;

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    this.startQuizz();
  }

  startQuizz(): void {
    const data = this.quizzService.getQuizzData();
    if (data) {
      this.finished = false;
      this.title = data.title;
      this.questions = data.questions;
      this.results = data.results;
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.questionSelected = this.questions[this.questionIndex];
      this.answers = [];
      this.answerSelected = '';
    }
  }

  playerChoose(value: string): void {
    if (this.finished || this.isCalculating || this.isTransitioning) return;
    this.answers.push(value);
    this.isTransitioning = true;
    setTimeout(() => {
      this.nextStep();
      this.isTransitioning = false;
    }, 400);
  }

  private async nextStep(): Promise<void> {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.isCalculating = true;
      setTimeout(async () => {
        const finalAnswer = await this.quizzService.calculateResult(
          this.answers,
        );
        this.finished = true;
        this.isCalculating = false;
        this.answerSelected =
          this.results[finalAnswer as keyof typeof this.results];
      }, 1000);
    }
  }

  get progressPercent(): number {
    return Math.round((this.questionIndex / this.questionMaxIndex) * 100);
  }

  restart(): void {
    this.startQuizz();
  }
}
