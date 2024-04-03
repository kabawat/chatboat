import React from 'react'

export const PageLoader = () => {
    return (
        <div className="loader_cubes">
            <div className="cubes">
                {
                    [...Array(64)].map((_, key) => {
                        return <div className="cube" key={key}>
                            <div className="side"></div>
                            <div className="side"></div>
                            <div className="side"></div>
                            <div className="side"></div>
                            <div className="side"></div>
                            <div className="side"></div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export const PageBoxLoader = () => {
    return (
        <div className="loader_page_box">
            <div className="box box0">
                <div></div>
            </div>
            <div className="box box1">
                <div></div>
            </div>
            <div className="box box2">
                <div></div>
            </div>
            <div className="box box3">
                <div></div>
            </div>
            <div className="box box4">
                <div></div>
            </div>
            <div className="box box5">
                <div></div>
            </div>
            <div className="box box6">
                <div></div>
            </div>
            <div className="box box7">
                <div></div>
            </div>
            <div className="ground">
                <div></div>
            </div>
        </div>
    )
}