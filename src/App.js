import { Fragment, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Quiz from './components/Quiz';
import { quizActions } from './store';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
    const responseData = await response.json();
			if(!response.ok) {
			  console.log("error:", responseData.error)
			  throw new Error(responseData.error.message);
			}
	
			if(response.status === 200) {
          const questionList = responseData.results.map((data)=> {
            return  {
              "question": data.question,
              "answer": data.correct_answer,
              "answers": [data.correct_answer, ...data.incorrect_answers].sort(() => Math.random() - 0.5)
            }
          })
          dispatch(quizActions.setQuestions(questionList));
          setLoaded(true);
      }
     
  }
  useEffect(() => {
    const response = fetchQuestions();
  }, [])
  return (
    <Fragment>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">Quiz App</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="App">
       { !loaded &&  <center> Quiz is loading.... </center>}
       { loaded && <Quiz/>}
      </div>
    </Fragment>
  );
}

export default App;
