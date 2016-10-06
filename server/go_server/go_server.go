// 用户头像存储服务
package main

import (
	"net/http"
)


func main()  {
	http.HandleFunc("/get", GetHandler)
	http.ListenAndServe(":8899", nil)
}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello test."))
}
