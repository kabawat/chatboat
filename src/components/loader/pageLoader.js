import React from 'react'

export const PageLoader = () => {
    return (
        <div class="loader_cubes">
            <div class="cubes">
                {
                    [...Array(64)].map((_, key) => {
                        return <div class="cube" key={key}>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export const PageBoxLoader = () => {
    return (
        <div class="loader_page_box">
            <div class="box box0">
                <div></div>
            </div>
            <div class="box box1">
                <div></div>
            </div>
            <div class="box box2">
                <div></div>
            </div>
            <div class="box box3">
                <div></div>
            </div>
            <div class="box box4">
                <div></div>
            </div>
            <div class="box box5">
                <div></div>
            </div>
            <div class="box box6">
                <div></div>
            </div>
            <div class="box box7">
                <div></div>
            </div>
            <div class="ground">
                <div></div>
            </div>
        </div>
    )
}