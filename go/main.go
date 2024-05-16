package main

import "github.com/go-fuego/fuego"

type MyInput struct {
	Name string `json:"name" validate:"required"`
}

type MyOutput struct {
	Message string `json:"message"`
}

func main() {
	s := fuego.NewServer()

	// Automatically generates OpenAPI documentation for this route
	fuego.Post(s, "/post", func(c *fuego.ContextWithBody[MyInput]) (MyOutput, error) {
		body, err := c.Body()
		if err != nil {
			return MyOutput{}, err
		}

		return MyOutput{
			Message: "Hello, " + body.Name,
		}, nil
	})

	s.Run()
}
