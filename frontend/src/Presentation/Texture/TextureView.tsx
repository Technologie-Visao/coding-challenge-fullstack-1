import { Tooltip } from "@material-ui/core";
import './TextureView.css';

type TextureComponentProps = {
    name: string,
    description: string,
    thumbnail_url: string,
}

const TextureComponent = (props: TextureComponentProps) => {
    return (
        <Tooltip title={props.description}>
            <div className="Box">
                <h3>{props.name}</h3>
                <img src={props.thumbnail_url} />
            </div>
        </Tooltip>
    );
}

export default TextureComponent