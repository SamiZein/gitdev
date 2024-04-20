package main

import (
	"math/rand"
	"strconv"
)

func randomColorHex() string {
	red := rand.Intn(256)
	green := rand.Intn(256)
	blue := rand.Intn(256)

	redHex := strconv.FormatInt(int64(red), 16)
	greenHex := strconv.FormatInt(int64(green), 16)
	blueHex := strconv.FormatInt(int64(blue), 16)

	if len(redHex) == 1 {
		redHex = "0" + redHex
	}
	if len(greenHex) == 1 {
		greenHex = "0" + greenHex
	}
	if len(blueHex) == 1 {
		blueHex = "0" + blueHex
	}

	colorHex := "#" + redHex + greenHex + blueHex

	return colorHex
}
