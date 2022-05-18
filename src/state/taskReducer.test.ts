// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
// import {addTodolistAC, removeTodolistAC} from "./todolistsReducer";
//
// export let a = 1
//
// test("Removing task from correct todolist", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, removeTaskAC(todolistId1, "1"))
//
//     expect(endState[todolistId1].length).toBe(2)
//     expect(endState[todolistId1][1].id).toBe("3")
//     expect(endState[todolistId2].length).toBe(3)
//     expect(endState[todolistId2][1].id).toBe("2")
// })
//
// test("Adding task to correct todolist", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, addTaskAC(todolistId1, "Redux"))
//
//     expect(endState[todolistId1].length).toBe(4)
//     expect(endState[todolistId2].length).toBe(3)
//     expect(endState[todolistId1][0].title).toBe("Redux")
// })
//
// test("Changing task title in correct todolist", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, changeTaskTitleAC(todolistId2, "1", "Banana"))
//
//     expect(endState[todolistId1].length).toBe(3)
//     expect(endState[todolistId2].length).toBe(3)
//     expect(endState[todolistId2][0].title).toBe("Banana")
// })
//
//
// test("Changing task status in correct todolist", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, changeTaskStatusAC(todolistId1, "1", false))
//
//     expect(endState[todolistId1].length).toBe(3)
//     expect(endState[todolistId1][0].isDone).toBe(false)
// })
//
// test("Empty array of tasks should be added when adding new todolist", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, addTodolistAC("New todolist"))
//     let keys = Object.keys(endState)
//     expect(keys.length).toBe(3)
// })
//
// test("todolist property should be removed", () => {
//     let todolistId1 = "todolistId1"
//     let todolistId2 = "todolistId2"
//
//     let startState = {
//         [todolistId1]: [
//             {id: "1", title: "HTML", isDone: true},
//             {id: "2", title: "CSS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "Banna", isDone: false},
//             {id: "2", title: "Milk", isDone: false},
//             {id: "3", title: "Snickers", isDone: false},
//         ],
//     }
//
//     let endState = taskReducer(startState, removeTodolistAC(todolistId2))
//     let keys = Object.keys(endState)
//     expect(keys.length).toBe(1)
//     expect(endState[todolistId2]).toBe(undefined)
//     expect(endState[todolistId1]).toBeDefined()
// })

export let b = 1