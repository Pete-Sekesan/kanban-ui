import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const tasksFromBackend = [
  {
    id: uuid(),
    title: "First task",
    description: "testing",
    assignee: "Pete",
  },
  {
    id: uuid(),
    title: "Second task",
    description: "testing",
    assignee: "Pete",
  },
  { id: uuid(), title: "Third task", description: "testing", assignee: "Pete" },
  {
    id: uuid(),
    title: "Fourth task",
    description: "testing",
    assignee: "Pete",
  },
  { id: uuid(), title: "Fifth task", description: "testing", assignee: "Pete" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Todo",
    items: tasksFromBackend,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <main>
      <header className="App-header">
        <h1>KANBAN!</h1>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          background: "lightgray",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "darkgray"
                              : "white",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: "black",
                                        opacity: 0.9,

                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <h1>{item.title}</h1>
                                      <p>{item.description}</p>
                                      <p>Assigned to {item.assignee}</p>
                                      <button type="button">Delete</button>

                                      <button type="button">Edit</button>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
                <button type="button" className="List-add-button">
                  + Add A Task
                </button>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </main>
  );
}

export default App;
