import { Component } from 'react';

import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';



class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addAttribute = (property) => {
      this.setState(prevState => {
        const feedback = prevState[property]
        return {
            [property]: feedback + 1
        }
    })

    
  }
  countTotalFeedback = () => {
    const total = Object.values(this.state).reduce((total, value) =>  value ? total + value : total, 0)

    return total;
  }
  countPositiveFeedbackPercentage = () =>{
    const {good} = this.state
    if(this.countTotalFeedback()){
        const percentage = Number.parseFloat((good / this.countTotalFeedback() * 100).toFixed(1))
        return percentage
    }
    return 0;
}

  render() {
      const {good, neutral, bad} = this.state;
      const {countTotalFeedback, countPositiveFeedbackPercentage} = this;
      
    return (
      <>
        <FeedbackOptions options={this.state} onLeaveFeedback={this.addAttribute}/>

        <Statistics good={good} neutral={neutral} bad={bad} total={countTotalFeedback()} positivePercentage={countPositiveFeedbackPercentage()} />
      </>
    );
  }
}

export default Feedback;
