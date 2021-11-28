import React from "react"
import "./style.css"

class SystemDesign extends React.Component {

    render() {
        const developers = this.props.developers.map((developer) => {
            return (
                <li>{developer.name} ({developer.email})</li>
            );
        })

        return (
            <div className="system-box">
                <h3>{this.props.name}</h3>

                <div className="system-sections">
                    <div>
                        <h4>Owner</h4>
                        <ul>
                            <li>{this.props.owner.name} ({this.props.owner.email})</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Department</h4>
                        <ul>
                            <li>{this.props.department.name} ({this.props.department.email})</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Developers</h4>
                        <ul>
                            {developers}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SystemDesign
