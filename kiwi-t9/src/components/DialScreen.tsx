import { spline }  from '@georgedoescode/spline';
import { useEffect, useRef, useState } from 'react';
import SimplexNoise from 'simplex-noise';

export function DialScreen(props: any) {
    const [closing, setClosing] = useState<boolean>(false);
    const path = useRef<SVGPathElement>(null);
    const simplex = new SimplexNoise();
    let noiseStep = 0.001;
    let hueNoiseOffset = 0;

    
    function createPoints() {
        const points = [];
        // how many points do we need
        const numPoints = 6;
        // used to equally space each point around the circle
        const angleStep = (Math.PI * 2) / numPoints;
        // the radius of the circle
        const rad = 80;
        
        for (let i = 1; i <= numPoints; i++) {
            // x & y coordinates of the current point
            const theta = i * angleStep;
        
            const x = 105 + Math.cos(theta) * rad;
            const y = 105 + Math.sin(theta) * rad;
        
            // store the point
            points.push({
            x: x,
            y: y,
            /* we need to keep a reference to the point's original {x, y} coordinates 
            for when we modulate the values later */
            originX: x,
            originY: y,
            // more on this in a moment!
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
            });
        } 
        return points;
    }
    // map a number from 1 range to another
    function map(n:number, start1:number, end1:number, start2:number, end2:number) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }
    const points = createPoints();
    function noise(x: number, y:number) {
        // return a value at {x point in time} {y point in time}
        return simplex.noise2D(x, y);
    }
    let animation: any = null;
    function animate() {
        if(path.current) {
            path.current.setAttribute("d", spline(points, 1, true));
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
            
                // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
                const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
                const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
                // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
                const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
                const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);
            
                // update the point's current coordinates
                point.x = x;
                point.y = y;
            
                // progress the point's x, y values through "time"
                point.noiseOffsetX += noiseStep;
                point.noiseOffsetY += noiseStep;
              }
        }
        const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
        const hue = map(hueNoise, -1, 1, 0, 360);

        document.documentElement.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
        document.documentElement.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
        // document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;
        hueNoiseOffset += noiseStep / 6;

        if(!closing) {
            animation = window.requestAnimationFrame(animate);      
        }      
    }
    useEffect(() => {
        animate()
    })
    function closeDialog() {
        setClosing(true);
        setTimeout(()=> {
            props.handleCalling(false); 
            window.cancelAnimationFrame(animation)

        }, 1200);
    }
    return(<>
        <div id="dial-screen" className={closing ? "hide-dialog" : ""}>
            <div className="info">
                <div className="text">Calling to*</div>
                <span className="discreet">* not really</span>
                <div className="img-wrapper">
                    <img className="user-img" src={props.user.picture.large}></img>
                    <svg viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop id="gradientStop1" offset="0%" stopColor="var(--startColor)" />
                            <stop id="gradientStop2 " offset="100%" stopColor="var(--stopColor)" />
                            </linearGradient>
                        </defs>
                        <path ref={path} d="" fill="url('#gradient')"></path>
                    </svg>
                </div>
                <h2>{props.user.name.first} {props.user.name.last}</h2>
            </div>
            <div className="controls" onClick={closeDialog}>
                <div className="wrapper"><img src="/phone.png" alt="End Call" /></div>
                <p>End call</p>
            </div>
        </div>
    </>)
}