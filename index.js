const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "090-1233398",
  },
  {
    id: 5,
    name: "Martha eck",
    number: "090-4343498",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<div>
  <p>Phonebook has info for ${persons.length} people</p>
  ${new Date()}
  </div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  let selectedPerson = persons.find((person) => person.id === id);

  if (selectedPerson) {
    res.json(selectedPerson);
  }
  res.status(404).end();
});

function generateId() {
  return Math.floor(Math.random() * 9999999999);
}

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (body.name === "" || body.number === "") {
    return res.status(400).json({ error: "Missing content" });
  }
  exists = persons.find((person) => person.name === body.name);
  if (exists) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const personObject = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = [...persons, personObject];
  res.json(personObject);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
