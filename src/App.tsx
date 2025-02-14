import {useState,} from 'react'  // カンマの後にスペースがない、末尾のカンマ

interface Task{  // 波括弧の前にスペースがない
id: number  // インデントが不適切
  text:string  // コロンの後にスペースがない
  completed:boolean
}

function App(){  // 波括弧の前にスペースがない
  const [ tasks,setTasks ] = useState<Task[]>([])  // 配列の括弧内に不要なスペース
  const [newTask,setNewTask] = useState('')  // カンマの後にスペースがない

  const addTask = (e:React.FormEvent) => {  // コロンの後にスペースがない
    e.preventDefault()
    if(newTask.trim()){  // if の後にスペースがない
      setTasks([...tasks,{ id: Date.now(),text: newTask,completed: false }])  // カンマの後にスペースがない
      setNewTask('')
    }
  }

  const toggleTask=(id: number)=> {  // アロー関数の前後にスペースがない
    setTasks(tasks.map(task=> 
      task.id===id ? {...task,completed: !task.completed } : task  // 演算子の前後にスペースがない
    ))
  }

  const deleteTask = (id:number) => {  // コロンの後にスペースがない
    setTasks(tasks.filter(task=>task.id !== id))  // アロー関数の前後にスペースがない
  }

  return(  // 括弧の前にスペースがない
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">タスク管理</h1>
          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="新しいタスクを入力..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                追加
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  削除
                </button>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              タスクがありません。新しいタスクを追加してください。
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
