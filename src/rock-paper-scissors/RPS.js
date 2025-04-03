export default class RockPaperScissors {
    constructor(username) {
      this.username = username;
      this.score = {
        user: 0,
        cpu: 0,
      };
      this.gameHistoryLog = [];
    }
  
    generateCPUResponse() {
      const acceptedValues = ['rock', 'paper', 'scissors'];
      const randomIndexNumber = Math.floor(Math.random() * 3);
      return acceptedValues[randomIndexNumber];
    }
  
    determineWinner(userSelection, cpuSelection) {
      if (userSelection === cpuSelection) {
        return 'tie';
      } else if (
        (userSelection === 'paper' && cpuSelection === 'rock') ||
        (userSelection === 'scissors' && cpuSelection === 'paper') ||
        (userSelection === 'rock' && cpuSelection === 'scissors')
      ) {
        return 'win';
      } else {
        return 'lose';
      }
    }
  

    isValidSelection(selection) {
      const validChoices = ['rock', 'paper', 'scissors'];
      return validChoices.includes(selection);
    }
  
    resetGame() {
      this.score = {
        user: 0,
        cpu: 0,
      };
      this.gameHistoryLog = [];
    }
  
    play(userSelection) {
      if (!this.isValidSelection(userSelection)) {
        console.error('Invalid selection! Please choose rock, paper, or scissors.');
        return;
      }
  
      const cpuSelection = this.generateCPUResponse();
      const results = this.determineWinner(userSelection, cpuSelection);
  
      if (results === 'win') {
        this.score.user++;
      }
      if (results === 'lose') {
        this.score.cpu++;
      }
  
      this.gameHistoryLog.push(
        `${this.username} selected ${userSelection}. CPU selected ${cpuSelection}: ${this.username} ${results}s`
      );
    }
  }
  