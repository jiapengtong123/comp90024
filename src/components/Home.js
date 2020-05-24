import React, {useState} from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Button from '@material-ui/core/Button';

function Home() {
  const [num, setNum] = useState(1);
  return (
      <div>
        <Button onClick={() => setNum(1)}>Scenario 1</Button>
        <Button onClick={() => setNum(2)}>Scenario 2</Button>
        <Button onClick={() => setNum(3)}>Scenario 3</Button>
        <Button onClick={() => setNum(4)}>Scenario 4</Button>
        <Button onClick={() => setNum(5)}>Scenario 5</Button>

        {num === 1 && <div>
          Scenario 1
          <div>Pie Chart</div>
          <PieChart/>
          <div>Bar Chart</div>
          <BarChart scenario={1}/>
        </div>
        }

        {num === 2 && <div>
          Scenario 2
        </div>
        }

        {num === 3 && <div>
          Scenario 3
        </div>
        }

        {num === 4 && <div>
          Scenario 4
        </div>
        }

        {num === 5 && <div>
          Scenario 5
        </div>
        }
      </div>
  );
}

export default Home;
