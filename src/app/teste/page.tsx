// file: /app/budget.js
import { Button } from "@mui/material";
import registerBudget from "./_actions/registerBudget";

export default function Budget() {
  const handleCreateBudget =  () => {
   registerBudget();
  }

  return (
    <main>
      <h1>
        <Button onClick={handleCreateBudget}>
          Criar orçamento
        </Button>
      </h1>
    </main>
  );
}
