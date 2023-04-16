import './TextureView.css';


type TextureComponentProps = {
    name: string,
    description: string,
    thumbnail_url: string,
}

const TextureComponent = (props: TextureComponentProps) => {
    const upperDescription = props.description.charAt(0).toUpperCase() + props.description.slice(1);
    return (
        <div className="img__wrap">
            <h3>{props.name}</h3>
            <img className="img__img" src={props.thumbnail_url} />
            <div className="img__description">
                <p>{upperDescription}</p>
            </div>
        </div>
    );
}

export default TextureComponent