import Spinner from "@/components/spinner/spinner";


const LoadingPage = () => {
    return (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
    }}>
        <Spinner />
    </div>);
}

export default LoadingPage;