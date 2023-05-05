import Header from "./components/Header"
import ChangleGame from "./components/ChangleGame"
import ANSWER_LIST from "./word_lists/answer_list"

export default function App() {
  const answerIndex: number = Math.floor(Math.random()*ANSWER_LIST.length)
  const answerWord = ANSWER_LIST[answerIndex]

  return (
    <>
      <Header/>
      <ChangleGame answer={answerWord.toUpperCase()}/>
    </>
  )
}

