import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface Timer {
  id: string;
  value: string;
}

interface Countdown {
  day: string,
  hour: string,
  minute: string,
  second: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  countdownTimerList: string[] = [];
  countdownTextList: string[] = [];
  countdownObj: Countdown = {
    day: '10',
    hour: '10',
    minute: '10',
    second: '10'
  }

  ngOnInit(): void {
    this.countdownTimerList = Object.values(this.countdownObj);
    this.countdownTextList = ['Days', 'Hours', 'Minutes', 'Seconds'];
    this.sub = interval(1000).subscribe(x => {
      this.startCountdown(this.initTime());
    });
  }

  initTime(): Date {
    const nextYearDate = new Date(new Date().getFullYear() + 1, 0, 1);
    const today = Date.parse(new Date().toString());
    const newYearTimestamp = Date.parse(new Date(nextYearDate).toString());
    const remainingTimestamp = newYearTimestamp - today;
    const remainingDate = new Date(Date.parse(new Date().toString()) + remainingTimestamp);
    return remainingDate;
  }

  startCountdown(time: Date): void {
    const total = Date.parse(time.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    this.countdownObj.day = days.toString();
    this.countdownObj.hour = hours.toString();
    this.countdownObj.minute = minutes.toString();
    this.countdownObj.second = seconds.toString();
    this.countdownTimerList = Object.values(this.countdownObj);

    if (total <= 0) {
      this.sub.unsubscribe();
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
