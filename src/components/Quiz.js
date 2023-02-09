import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import he from 'he'
import classes from './Quiz.module.css';
import { quizActions } from '../store';
import CountDownTimer from "./CountDownTimer";
import QuizResult from "./QuizResult";
const Quiz = () => {
    const current = useSelector(state => state.quizReducer.current);
    const question = useSelector(state => state.quizReducer.questions);
    const score = useSelector(state => state.quizReducer.score);
    const dispatch = useDispatch();
    const [ans, setAns] = useState('');
    const [quizEnd, setQuizEnd] = useState(false);
    const [quizStart, setQuizStart] = useState(false);
    const [selectedAns, setSelectedAns] = useState([]);

    console.log('selected answer:',selectedAns)  
    
    const answerHandler = (data) => {
        setAns(data);
    }

    const nextQuestion = useCallback(() => {
        console.log("selected ans:", ans)
        if(ans === question[current].answer) {
            dispatch(quizActions.setScore())
        }
        setSelectedAns(state => [...state, ans ? ans : '-'])
        setAns('');
        dispatch(quizActions.setCurrent())
    })
    
    const quizSubmit = () => {
        nextQuestion();
        setQuizEnd(true);
    };
    
    const restartQuiz = useCallback(() => {
        dispatch(quizActions.resetQuiz());
        setSelectedAns([]);
        setQuizEnd(false);
        setAns([]);
        setQuizStart(false);
    });

    const timerHandler = () => {
        if(current < question.length - 1) {
             nextQuestion();
        } else {
            nextQuestion();
            setQuizEnd(true);
        }
    };
    
    // const result = selectedAns.map((data,index) => {
    //     return (
    //         <tr key={index} className={`${question[index].answer === data ? 'true' : 'wrong'}`}>
    //             <td>{index + 1}</td>
    //             <td>{question[index].question}</td>
    //             <td>{question[index].answer}</td>
    //             <td>{data  ? data : '-'}</td>
    //         </tr>
    //     )
    // });
    

    return (
        <Fragment>
            {!quizEnd && <div className={classes['quiz-container']}>
               
                {!quizStart && <Card className={classes['answer-card']}>
                <h5>Before you start</h5>
                    <ul>
                        <li>You must complete this assessment in one session — make sure your internet is reliable.</li>
                        <li>10 multiple choice questions</li>
                        <li>1.5 minutes per question</li>
                        <li>You can retake this assessment once if you don’t earn a badge.</li>
                    </ul>
                  
                    <Button variant="success" onClick={() => {setQuizStart(true)}}>Start Quiz</Button></Card>}
               
                { quizStart && question && <Card className={classes['answer-card']}>
                    {!quizEnd &&  <Card.Title> Q.{current+1} {he.decode(question[current].question)}</Card.Title>}
                    <Card.Body className="px-0">
                    {!quizEnd && 
                        <div>
                            <ListGroup className={classes['answer-list']}>
                                {
                                     question[current].answers.map((data, index) => {
                                        return (
                                            <ListGroup.Item key={'ans' + index} className={classes.answer} variant={ans === data ? 'primary' : ''} onClick={() => answerHandler(data)}>{index + 1}. { he.decode(data)}</ListGroup.Item>
                                        )
                                    })
                                }
                                
                            </ListGroup>
                        </div>
                    }
                    </Card.Body>
                    <div className="d-flex justify-content-between">
                        {current < question.length && <span>Time: <CountDownTimer timeEnd={timerHandler} current={current}/></span>}
                        {current < question.length - 1 && <Button variant="success" onClick={nextQuestion}>Next</Button>}
                        {current === question.length - 1 && <Button variant="danger" onClick={quizSubmit}>submit</Button>}
                    </div>
                </Card>}
            </div>
            }
            {quizEnd && 
                <div className={classes['result-container']}>
                    <Container>
                        <QuizResult selectedAns={selectedAns} question={question} score={score} onRestartQuiz={restartQuiz}/>
                    </Container>
                </div>
            }
        </Fragment>
    )
}

export default Quiz;