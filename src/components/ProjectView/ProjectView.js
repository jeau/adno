import { Component } from "react";
import { withRouter } from "react-router";

// Import FontAwesome icons
import { faCopy, faDownload, faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import popup alerts
import Swal from 'sweetalert2';

// Import utils
import { deleteProject, createExportProjectJsonFile, duplicateProject, getAllProjectsFromLS } from "../../Utils/utils";

// Import CSS
import "./ProjectView.css";

// Add Internationalization
import { withTranslation } from "react-i18next";

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbAnnotations: 0,
            imgSource: "",
            imgWidth: 0
        }
    }

    componentDidMount() {
        if (this.props.project.manifest_url) {
            fetch(this.props.project.manifest_url)
                .then(rep => rep.json())
                .then(manifest => {
                    if (manifest["@id"] && manifest["sizes"] && manifest["sizes"].length > 0) {

                        let manifestHeight = manifest["sizes"].sort((a, b) => b.width - a.width)[0].height
                        var manifestWidth = manifest["sizes"].sort((a, b) => b.width - a.width)[0].width

                        this.setState({ imgWidth: manifest["sizes"].sort((a, b) => b.width - a.width)[0].width })
                        this.setState({ imgSource: manifest["@id"] + "/full/" + manifestWidth + "," + manifestHeight + "/0/default.jpg" })
                    } else if (manifest["@id"] && manifest["tiles"] && manifest["tiles"][0]) {
                        this.setState({ imgWidth: manifest["tiles"][0].width })
                        this.setState({ imgSource: manifest["@id"] + "/full/" + manifest["tiles"][0].width + ",/0/default.jpg" })
                    } else if (manifest["id"] && manifest["tiles"]) {
                        this.setState({ imgWidth: manifest["tiles"][0].width })
                        this.setState({ imgSource: manifest["id"] + "/full/" + manifest["tiles"][0].width + ",/0/default.jpg" })
                    } else if (manifest["@id"] && manifest["@context"] && manifest["@context"] === "http://library.stanford.edu/iiif/image-api/1.1/context.json") {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: manifest["@id"] + "/full/,250/0/native.jpg" })
                    } else if (this.props.project.manifest_url.indexOf("info.json") !== -1) {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: this.props.project.manifest_url.replace("info.json", "") + "/full/,250/0/native.jpg" })
                    }
                    else if (manifest["@id"] && !manifest["tiles"]) {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: manifest["@id"] + "/full/,250/0/native.jpg" })
                    }

                    if (localStorage.getItem(this.props.project.id + "_annotations")) {
                        let nbAnnotations = JSON.parse(localStorage.getItem(this.props.project.id + "_annotations")).length
                        this.setState({ nbAnnotations })
                    }
                })

        } else if (this.props.project.img_url) {
            this.setState({ imgSource: this.props.project.img_url })

            if (localStorage.getItem(`${this.props.project.id}_annotations`)) {
                let nbAnnotations = (JSON.parse(localStorage.getItem(this.props.project.id + "_annotations")) && JSON.parse(localStorage.getItem(this.props.project.id + "_annotations")).length) || 0
                this.setState({ nbAnnotations })
            }
        }
    }

    deleteProj = (projID) => {
        Swal.fire({
            title: this.props.t('modal.delete_project'),
            showCancelButton: true,
            confirmButtonText: this.props.t('modal.confirm_delete'),
            cancelButtonText: this.props.t('modal.cancel'),
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject(projID)
                Swal.fire(this.props.t('modal.projects_list_up_to_date'), '', 'success')
                    .then((result) => {
                        var projects = getAllProjectsFromLS()
                        result.isConfirmed && this.props.updateProjectsList(projects)
                    })
            }
        })
    }

    duplicate = (projID) => {
        Swal.fire({
            title: this.props.t('modal.duplicate_project'),
            showCancelButton: true,
            confirmButtonText: this.props.t('modal.confirm_duplication'),
            cancelButtonText: this.props.t('modal.cancel'),
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                duplicateProject(projID)
                Swal.fire(this.props.t('modal.projects_list_up_to_date'), '', 'success')
                    .then((result) => {
                        var projects = getAllProjectsFromLS()
                        result.isConfirmed && this.props.updateProjectsList(projects)
                    })
            }
        })
    }

    render() {
        return (
            <div className="card card-side bg-base-100 shadow-xl project-view-card">
                <div className="project-card-img" onClick={() => this.props.history.push(`/project/${this.props.project.id}/view`)}>
                    <img src={this.state.imgSource} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://www.pngkey.com/png/detail/212-2124171_404-error-404-pagina-no-encontrada.png"
                    }} className="img-fluid img-proj-view " alt={this.props.project.title} />


                </div>
                <div className="project-card-body">
                    <div className="project-text">
                        <h2 className="card-title">{this.props.project.title}</h2>
                        <p className="card-text card-date"><small className="text-muted"> {this.props.t('project.created_on')} {new Date(this.props.project.creation_date).toLocaleDateString()}</small></p>
                        <p className="card-text">{this.props.project.description ? this.props.project.description : this.props.t('project.no_desc')}</p>
                        <p className="card-text card-date"><small className="text-muted"> {this.props.t('project.last_update')}  {new Date(this.props.project.last_update).toLocaleDateString()}</small></p>
                        <p className="card-text"><small className="text-muted"> <span className="badge badge-lg">{this.state.nbAnnotations} annotation{this.state.nbAnnotations > 1 && "s"}</span> </small></p>
                    </div>
                    <div className="project_vw_btns">
                        <div className="tooltip" data-tip={this.props.t('project.preview')}>
                            <button type="button" className="btn btn-md" onClick={() => this.props.history.push(`/project/${this.props.project.id}/view`)}> <FontAwesomeIcon icon={faEye} />   </button>
                        </div>
                        {
                            process.env.ADNO_MODE === "FULL" &&
                            <div className="tooltip" data-tip={this.props.t('project.edit')}>
                                <button type="button" className="btn btn-md" onClick={() => this.props.history.push(`/project/${this.props.project.id}/edit`)}> <FontAwesomeIcon icon={faPenToSquare} /> </button>
                            </div>
                        }
                        <div className="tooltip" data-tip={this.props.t('project.duplicate')}>
                            <button type="button" className="btn btn-md btn-outline" onClick={() => this.duplicate(this.props.project.id)}><FontAwesomeIcon icon={faCopy} /></button>
                        </div>
                        <div className="tooltip" data-tip={this.props.t('project.download')}>
                            <a id={"download_btn_" + this.props.project.id} href={createExportProjectJsonFile(this.props.project.id)} download={this.props.project.title + ".json"} className="btn btn-md btn-outline"> <FontAwesomeIcon icon={faDownload} />  </a>
                        </div>
                        <div className="tooltip" data-tip={this.props.t('project.delete')}>
                            <button type="button" className="btn btn-md btn-outline btn-error" onClick={() => this.deleteProj(this.props.project.id)}>    <FontAwesomeIcon icon={faTrash} />  </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ProjectView));