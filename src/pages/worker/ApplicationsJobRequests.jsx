import useGetWorkerApplicationsByWorkerId from "../../data/hooks/useGetWorkerApplicationsByWorkerId.js";


const ApplicationsJobRequests = () => {

const { applicationsWorker, loadingapplicationsWorker, errorapplicationsWorker } = useGetWorkerApplicationsByWorkerId(1);

console.log(applicationsWorker);

    return(
        <div>
            <h1>Applications Job Requests Page</h1>
        </div>
    )
}

export default ApplicationsJobRequests;