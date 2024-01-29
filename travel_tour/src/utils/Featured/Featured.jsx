import { MoreVert } from "@mui/icons-material"
import { Progress } from 'rsuite';
import "./featured.scss"

export const Featured = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Service</h1>
                <MoreVert fontSize="small" cursor={Progress}/>
            </div>
            <div className="Bottom">
                <div className="featuredChart">
                    <Progress.Circle
                        percent={30}
                        strokeColor="primary"
                        strokeWidth={5}
                        trailWidth={5}
                    />
                </div>
                <p className="title">Total service made in month.</p>
                <p className="amount">23</p>
                <p className="decs" >hekjf hefuiewhfe
                    wiufewiu
                    fgewgfiuwgfewifgewf hsdsjdsh 
                    jsdksjhds
                </p>
            </div>
        </div>
    )
}
