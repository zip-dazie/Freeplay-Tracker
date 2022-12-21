import './Body.css';
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

function Body() {
  return (
    <div className="Body">
        <div className="column">
            <p>Court 1</p>
            <div className="courts">
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
            </div>
        </div>
        <div className="column">
            <p>Court 2</p>
            <div className="courts">
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
            </div>
        </div>
        <div className="column">
            <p>Court 3</p>
            <div className="courts">
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
                <Box 
                    className='court'
                    sx={{ 
                        width: 'calc(100% - 10px)', 
                        height: 'calc(25% - 10px)',
                        backgroundColor: grey[300]
                    }} 
                />
            </div>
        </div>
    </div>
  );
}

export default Body;
