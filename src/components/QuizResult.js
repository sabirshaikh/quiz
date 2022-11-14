import { Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const QuizResult = (props) => {
    
    const result = props.selectedAns.map((data,index) => {
        return (
            <tr key={index} className={`${props.question[index].answer === data ? 'true' : 'wrong'}`}>
                <td>{index + 1}</td>
                <td>{props.question[index].question}</td>
                <td>{props.question[index].answer}</td>
                <td>{data  ? data : '-'}</td>
            </tr>
        )
    });
    return (
        <Fragment>
            <h2>Result: {props.score} out of {props.question.length}</h2>
            {/* <p><b>Scored is: {props.score} out of {props.question.length}</b></p> */}
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Question</th>
                        <th>Correct answer</th>
                        <th>Your answer</th>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={() => props.onRestartQuiz()}>Try again</Button>
        </Fragment>
    )
}

export default QuizResult;