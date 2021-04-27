import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";
import "./App.css";

const tasksFromBackend = [
  {
    id: uuidv4(),
    title: "Get MongoDB up and running",
    description: "Figure out issue with MacOSX Catalina",
    assignee: "Pete",
  },
  {
    id: uuidv4(),
    title: "Record Demo Video",
    description: "Submit demo video explaining code and issues ran into",
    assignee: "Pete",
  },
];

const columnsFromBackend = [
  {
    [uuidv4()]: {
      name: "Todo",
      tasks: [tasksFromBackend],
    },
  },
];
function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <main className="App">
      <header className="App-header">
        <h1>KANBAN!</h1>
      </header>
      <div className="App-list">
        <DragDropContext onDropEnd={(result) => console.log(result)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <Droppable droppableId={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    ></div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>

        {/* {store.lists.map((list) => (
          <List
            key={list.id}
            header={list.header}
            cards={list.cardIds.map((id) => store.allCards[id])}
          />
        ))} */}
      </div>
    </main>
  );
}

export default App;
