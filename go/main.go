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

	fuego.Post(s, "/post", sayHello)
	fuego.Get(s, "/get", getName)

	s.Run()
}

func getName(c fuego.ContextNoBody) (string, error) {
	return "Nikita", nil
}

func sayHello(c *fuego.ContextWithBody[MyInput]) (MyOutput, error) {
	body, err := c.Body()
	if err != nil {
		return MyOutput{}, err
	}

	return MyOutput{
		Message: "Hello, " + body.Name,
	}, nil
}
