import ScopeHorizontal from './ScopeHorizontal';
import ScopeTrigger from './ScopeTrigger';
import ScopeVertical from './ScopeVertical';
import ScopeChart from './ScopeChart';
import './styles/Scope.css';

function Scope() {

    return (
        <div>
            <h2>Scope</h2>
            <ScopeChart/>
            <div className="row m-1">
                <div className="col-xl m-1 px-1 border-spec">
                    <ScopeVertical channelNum={1} />
                </div>
                <div className="col-xl m-1 px-1 border-spec">
                    <ScopeVertical channelNum={2} />
                </div>
                <div className="col-xl m-1 px-1 border-spec">
                    <ScopeHorizontal />
                </div>
                <div className="col-xl m-1 px-1 border-spec">
                    <ScopeTrigger />
                </div>
            </div>
        </div>
    );
}

export default Scope;