import Paper from '@material-ui/core/Paper';

function Popup() {
    return <>
        <Paper>
            <Tabs value={value} indicatorColor="primary" textColor="primary"
                onChange={handleChange} aria-label="disabled tabs example">
                <Tab label="Gruppe erstellen" />
                <Tab label="Gruppe beitreten" />
            </Tabs>

        </Paper>
    </>
}

export default Popup;