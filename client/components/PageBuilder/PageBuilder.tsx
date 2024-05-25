import { Data, Puck } from '@measured/puck';
import { config } from '@/configs/puck.config';
import '@measured/puck/dist/index.css';
import classes from './PageBuilder.module.css';

interface Props {
  initialData: Data;
  save: (data: Data) => void;
}

export function PageBuilder(props: Props) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.builder}>
          <Puck config={config} data={props.initialData} onPublish={props.save} />
        </div>
      </div>
    </>
  );
}
