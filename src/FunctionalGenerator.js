import './styles/FunctionalGenerator.css';
import FunctionalGeneratorChannelParams from "./FunctionalGeneratorChannelParams";

// basic component of functional generator
function FunctionalGenerator({tokenId}) {

  return (
    <div>
      <h2>Functional Generator (FG)</h2>
      <div className="row m-1">
        <div className="col-xl m-1 px-1 border-spec">
          <FunctionalGeneratorChannelParams channelNum={1} tokenId={tokenId} />
        </div>
        <div className="col-xl m-1 px-1 border-spec">
          <FunctionalGeneratorChannelParams channelNum={2} tokenId={tokenId} />
        </div>
      </div>
    </div>
  );
}

export default FunctionalGenerator;