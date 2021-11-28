import React from 'react';
import SystemDesign from "../systemDesign"
import DevelopersGraph from '../developersGraph'
import './style.css';

class SystemsDashboard extends React.Component {
    state = {
        systems: []
    }

    componentDidMount () {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                if (data.entities) {
                    data.entities_by_id = {}

                    data.entities.forEach((entity) => {
                        data.entities_by_id[entity.id] = entity;
                    })
                }

                this.setState({data})
            })
            .catch(err => console.error(err.message))
    }

    getOwner(entityId) {
        for(let relationship of this.state.data.relationships) {
            if (relationship.objectType === "owns" && relationship.end === entityId) {
                let ownerId = relationship.start
                let owner = this.state.data.entities_by_id[ownerId]
                return owner
            }
        }

        return null
    }

    getDepartment(entityId) {
        for(let relationship of this.state.data.relationships) {
            if (relationship.objectType === "belongs_to" && relationship.start === entityId) {
                let departmentId = relationship.end
                let department = this.state.data.entities_by_id[departmentId]

                return department
            }
        }

        return null
    }

    getDevelopers(entityId) {
        let developers = []

        for(let relationship of this.state.data.relationships) {
            if (relationship.objectType === "develops" && relationship.end === entityId) {
                let developerId = relationship.start
                let developer = this.state.data.entities_by_id[developerId]
                developers.push(developer)
            }
        }

        return developers
    }

    getSystemData = () => {
        let devData = {}

        for(let entity of this.state.data.entities) {
            if (entity.objectType === "System") {
                devData[entity.name] = 0;
            }
        }

        for(let relationship of this.state.data.relationships) {
            if (relationship.objectType === "develops") {
                let systemId = relationship.end
                let system = this.state.data.entities_by_id[systemId]

                devData[system.name] += 1;
            }
        }

        return devData;
    }

    render() {
        let systemData = []

        if (this.state.data && this.state.data.entities) {
            systemData = this.state.data.entities.filter((entity) => {
                return (entity.objectType === "System");
            })

            const systems = systemData.map((entity) => {
                let owner = this.getOwner(entity.id);
                let department = this.getDepartment(entity.id)
                let developers = this.getDevelopers(entity.id)

                return <SystemDesign name={entity.name} id={entity.id} owner={owner} department={department} developers={developers}/>
            })

            let barChartData = this.getSystemData();
            console.log(barChartData);

            return (
                <div className="system-dashboard">
                    <div className="system-list dashboard-element">
                        <h2>System Overview</h2>
                        {systems}
                    </div>

                    <div className="system-charts dashboard-element">
                        <h2>Resources Overview</h2>
                        <DevelopersGraph data={barChartData} />
                    </div>
                </div>
            )
        }

        return ('Fetching data..');
    }

}


export default SystemsDashboard;
