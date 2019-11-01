package utpage

class AdminController {

    def index() {
        if (session.user != "admin") {
            redirect(controller: "home", action: "index")
        }
    }

    def checkcredentials(params) {
        if (params.username == "user" && params.userpassword == "user") {
            session.user = "admin"
            render true
        } else {
            render false
        }
    }

    def login(params) {
    	if (params.username == "user" && params.userpassword == "user") {
    		flash.message = "login successful"
    		session.user = "admin"
    	} else {
    		flash.message = "login fault"
    	}

    	redirect(action: "index")
    }

    def logout() {
    	session.user = null
    	redirect(controller: "home", action: "index")
    }
}
