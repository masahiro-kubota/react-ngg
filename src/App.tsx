import {useState, FormEvent} from 'react'

interface UserAnswer {
  answer: number
}

class GameLogic {
  private secretNumber: number
  private maxAttempts: number
  private attempts: number

  constructor(secretNumber: number, maxAttempts: number) {
    this.secretNumber = secretNumber;
    this.maxAttempts = maxAttempts;
    this.attempts = 0;
  }

  checkAnswer(answer: number): string {
    this.attempts++;
    if (this.attempts >= this.maxAttempts) {
      return '試行回数が上限に達しました。';
      this.resetGame(this.secretNumber, this.maxAttempts);
    }
    if (answer === this.secretNumber) {
      return '正解です！';
    } else if (answer < this.secretNumber) {
      return 'もっと大きい数字です。';
    } else {
      return 'もっと小さい数字です。';
    }
  }
  resetGame(secretNumber: number, maxAttempts: number) {
    this.secretNumber = secretNumber;
    this.maxAttempts = maxAttempts;
    this.attempts = 0;
  }
}


export default function App () { 
  const [gameLogic] = useState<GameLogic>(new GameLogic(43, 10));
  const [userAnswer, setUserAnswer] = useState<UserAnswer>({answer: 0})
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = gameLogic.checkAnswer(userAnswer.answer);
    // 非同期なので最新の回答はconsole.log反映されない。
    console.log(result);
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Number Guessing Game</h1>
      <form onSubmit={ handleSubmit } className="mb-6">
        <div className="mb-4">
          <input
              type="number"
              name="answer"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUserAnswer({ answer: Number(e.target.value) })}
              placeholder="1~100の数字を入力してくさい"
              min="1"
              max="100"
              required
            />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-center text-gray-700">
          残り試行回数: 10回
        </p>
      </div>
      <div className="mt-6 rounded-lg">
        <button
          type="button"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

