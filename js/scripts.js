document.addEventListener('DOMContentLoaded', function() {
	console.log('windows start');







	var start_x;
	var start_y;
	var draggable_window;
	var resizable_window;
	var resizableInfo;
	var draggable_container = document.querySelectorAll('.js-windows_container');
	var resizable_container = document.querySelectorAll('.js-windows_container');
	var stop_min_x;
	var stop_min_y;
	var stop_max_x;
	var stop_max_y;
	var new_pos_x;
	var new_pos_y;
	var top_z_index = 10;
	var dragElement = function(element) {
		start_x = 0;
		start_y = 0;
		element.querySelector('.js-window_header').addEventListener('mousedown', dragMouseDown, true);


	}

	var dragMouseDown = function(e) {
		//console.log(e);
		//console.log(this);
		e.preventDefault();

		document.querySelectorAll('.js-windows_container').forEach(function(parentwindow) {
			if(parentwindow.classList.contains('active')) {
				draggable_container = parentwindow;
			}
		});



		top_z_index = top_z_index + 1;
		draggable_window = this.parentElement;

		//console.log(draggable_window.offsetWidth);
		//console.log(draggable_window.offsetHeight);
		start_x = e.screenX;
		start_y = e.screenY;
		document.addEventListener('mouseup', closeDragElement, true);
		document.addEventListener('mousemove', elementDrag, true);
	}

	var closeDragElement = function () {
		console.log(this);
		document.removeEventListener('mousemove', elementDrag, true);
		document.removeEventListener('mouseup', closeDragElement, true);
	}


	var elementDrag = function(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 =  e.screenX - start_x;
		pos2 =  e.screenY - start_y;

		start_x = e.screenX;
		start_y = e.screenY;






		/*

		console.log('draggable_window.offsetWidth',draggable_window.offsetWidth);
		console.log('draggable_window.offsetHeight',draggable_window.offsetHeight);
		*/


		new_pos_x = draggable_window.offsetLeft + pos1;
		new_pos_y = draggable_window.offsetTop + pos2;



		if(new_pos_x > 0 && new_pos_x < (draggable_container.offsetWidth - draggable_window.offsetWidth)) {
			draggable_window.style.left = new_pos_x + "px";
		}

		if(new_pos_y > 0 && new_pos_y < (draggable_container.offsetHeight - draggable_window.offsetHeight)) {
			draggable_window.style.top = new_pos_y + "px";
		}


		draggable_window.style.zIndex = top_z_index;

	}





	document.querySelectorAll('.js-window').forEach(function(item){
		dragElement(item);
	});




















	var resizeElement = function(element) {
		start_x = 0;
		start_y = 0;
		element.addEventListener('mousedown', resizeMouseDown, true);
	}

	var resizeMouseDown = function(e) {
		//console.log(e);
		//console.log(this);
		e.preventDefault();

		top_z_index = top_z_index + 1;
		resizable_window = this.parentElement.querySelector('.window__content');
		resizableInfo = resizable_window.getBoundingClientRect();
		//console.log(draggable_window.offsetWidth);
		//console.log(draggable_window.offsetHeight);
		start_x = e.screenX;
		start_y = e.screenY;
		document.addEventListener('mouseup', closeResizeElement, true);
		document.addEventListener('mousemove', elementResize, true);
	}


	var closeResizeElement = function () {
		console.log(this);
		document.removeEventListener('mousemove', elementResize, true);
		document.removeEventListener('mouseup', closeResizeElement, true);
	}


	var elementResize = function(e) {
		e = e || window.event;
		e.preventDefault();

		pos1 =  e.screenX - start_x;
		pos2 =  e.screenY - start_y;

		start_width = e.screenX;
		start_height = e.screenY;




		console.log('obj',resizable_window);
		console.log('w',resizableInfo.width);
		console.log('h',resizableInfo.height);




		new_pos_x = pos1;
		new_pos_y = pos2;

		console.log(new_pos_x);
		console.log(new_pos_y);

		console.log('----');


		if((resizableInfo.width * 1 + new_pos_x * 1) > 100) {
			resizable_window.style.width = (resizableInfo.width * 1 + new_pos_x * 1) + "px";
		}
		if((resizableInfo.height * 1 + new_pos_y * 1) > 50) {
			resizable_window.style.height = (resizableInfo.height * 1 + new_pos_y * 1) + "px";
		}


		resizable_window.style.zIndex = top_z_index;

	}


	document.querySelectorAll('.js-window_resizer').forEach(function(item) {
		resizeElement(item);
	});





	document.addEventListener('click',function(e) {
		document.querySelectorAll('.js-contex_content').forEach(function(item) {
			item.classList.remove('active');
		});
	});








	/**
	 * Player code
	 */



	console.log( 'player' );


	var song = new Audio();

	var songs_array = [

	];

	var resetmusic = function() {
		document.querySelectorAll('.js-songs li a').forEach(function(item) {
			item.classList.remove('active');
			if(typeof song !== 'undefined') {
				song.pause();
				song.currentTime = 0;
			}
		});
	};

	var playme = function(mp3) {
		song.src = mp3;
		song.play();
	};

	var playsong = function(mp3) {
		song.play();
	};

	var pausesong = function() {
		song.pause();
	};

	var stopsong = function() {
		song.pause();
		song.currentTime = 0;
	};

	var total_songs = 0;
	var currently_playing = 0;
	document.querySelectorAll('.js-songs li a').forEach(function(item) {
		total_songs++;
		item.addEventListener('click', function(e) {
			e.preventDefault();
			resetmusic();
			this.classList.add('active');
			document.querySelector('.js-play').classList.add('active');
			document.querySelector('.js-pause').classList.remove('active');
			var mp3 = this.href;
			songs_array.push(mp3);
			currently_playing = item.dataset.song;
			console.log(currently_playing);
			playme(mp3);
		});
	});

	document.querySelector('.js-prev').addEventListener('click', function(e) {
		e.preventDefault();
		if(currently_playing == 1) {
			currently_playing = total_songs;
		} else {
			currently_playing--;
		}



		console.log(currently_playing);
		resetmusic();
		var songlink = document.querySelector("[data-song='"+currently_playing+"']");
		songlink.classList.add('active');
		var mp3 = songlink.href;
		playme(mp3);
	});
	document.querySelector('.js-next').addEventListener('click', function(e) {
		e.preventDefault();
		if(currently_playing == total_songs) {
			currently_playing = 1;
		} else {
			currently_playing++;
		}



		console.log(currently_playing);
		resetmusic();
		var songlink = document.querySelector("[data-song='"+currently_playing+"']");
		songlink.classList.add('active');
		var mp3 = songlink.href;
		playme(mp3);
	});

	document.querySelector('.js-pause').addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.js-play').classList.remove('active');
		document.querySelector('.js-pause').classList.add('active');
		pausesong();
	});


	document.querySelector('.js-stop').addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.js-play').classList.remove('active');
		document.querySelector('.js-pause').classList.remove('active');
		resetmusic();
		stopsong();
	});


	document.querySelector('.js-play').addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.js-play').classList.add('active');
		document.querySelector('.js-pause').classList.remove('active');
		playsong();
	});

	document.querySelector('.js-player_volume').addEventListener('input', function(e) {
		e.preventDefault();
		document.querySelector('.js-player_volume_value').innerHTML = this.value;
		if(typeof song !== 'undefined') {
			song.volume = this.value/100;
		}
	});




	var layer_num;
	document.querySelectorAll('.js-layermenu a').forEach(function(item) {
		item.addEventListener('click',function(e) {
			e.preventDefault();
			document.querySelectorAll('.js-layermenu a').forEach(function(item) {
				item.classList.remove('active');
			});
			this.classList.add('active');
			layer_num = this.dataset.layer;
			document.getElementById('layername').innerText = layer_num;



			document.querySelectorAll('.js-windows_container').forEach(function(item) {
				item.classList.remove('active');
			});
			document.querySelectorAll('.js-windows_container').forEach(function(item) {
				if(item.dataset.winid === layer_num) {
					item.classList.add( 'active' );
				}
			});

		});
	});


	window['window_state_a'] = 0;
	window['window_state_b'] = 0;
	window['window_state_c'] = 0;
	window['window_state_d'] = 0;
	document.querySelectorAll('.js-window_minimise').forEach(function(item) {
		item.addEventListener('click',function(e) {
			e.preventDefault();
			e.stopPropagation();

			console.log('click');


			var win_id = 1;
			document.querySelectorAll('.js-windows_container').forEach(function(item) {
				if(item.classList.contains('active')) {
					win_id = item.dataset.winid;
				}
			});


			p_window = this.parentElement.parentElement;
			var left_px = p_window.offsetLeft;
			if(p_window.classList.contains('minimized')) {
				console.log(p_window.dataset.leftpx);

				var openSound = new Audio('./audio/WindowOpen.wav');
				openSound.loop = false;
				openSound.play();


				if(win_id == 1) {
					window['window_state_a'] = window['window_state_a'] - 1;
					p_window.style.left = p_window.dataset.leftpx+'px';
					p_window.style.zIndex = (top_z_index+1);
					top_z_index = top_z_index+1;
				}
				if(win_id == 2) {
					window['window_state_b'] = window['window_state_b'] - 1;
					p_window.style.left = p_window.dataset.leftpx+'px';
					p_window.style.zIndex = (top_z_index+1);
					top_z_index = top_z_index+1;
				}
				if(win_id == 3) {
					window['window_state_c'] = window['window_state_c'] - 1;
					p_window.style.left = p_window.dataset.leftpx+'px';
					p_window.style.zIndex = (top_z_index+1);
					top_z_index = top_z_index+1;
				}
				if(win_id == 4) {
					window['window_state_d'] = window['window_state_d'] - 1;
					p_window.style.left = p_window.dataset.leftpx+'px';
					p_window.style.zIndex = (top_z_index+1);
					top_z_index = top_z_index+1;
				}




				p_window.classList.remove('minimized');

				document.querySelectorAll('.js-windows_container').forEach(function(wind) {
					if(wind.classList.contains('active')) {
						var n = 0;
						wind.querySelectorAll('.minimized').forEach(function(mind) {
							n++;
							mind.style.left = 250 + 80*n - 80 + 'px';
						});
					}
				});
			} else {

				var closeSound = new Audio('./audio/WindowClose.wav');
				closeSound.loop = false;
				closeSound.play();

				if(win_id == 1) {
					window['window_state_a'] = window['window_state_a'] + 1;
					p_window.style.left = 250 + 80*window['window_state_a'] - 80 + 'px';
				}
				if(win_id == 2) {
					window['window_state_b'] = window['window_state_b'] + 1;
					p_window.style.left = 250 + 80*window['window_state_b'] - 80 + 'px';
				}
				if(win_id == 3) {
					window['window_state_c'] = window['window_state_c'] + 1;
					p_window.style.left = 250 + 80*window['window_state_c'] - 80 + 'px';
				}
				if(win_id == 4) {
					window['window_state_d'] = window['window_state_d'] + 1;
					p_window.style.left = 250 + 80*window['window_state_d'] - 80 + 'px';
				}

				p_window.classList.add('minimized');
				p_window.dataset.leftpx = left_px;


				console.log(p_window.dataset.leftpx);
			}

		});
	});




	document.querySelectorAll('.js-window_close').forEach(function(item) {
		item.addEventListener('click',function(e) {
			e.preventDefault();
			e.stopPropagation();

			console.log('click');


			var win_id = 1;
			document.querySelectorAll('.js-windows_container').forEach(function(item) {
				if(item.classList.contains('active')) {
					win_id = item.dataset.winid;
				}
			});


			p_window = this.parentElement.parentElement;
			p_window.classList.add('hidden');

		});
	});





	document.querySelectorAll('.js-contexmenu_open').forEach(function(item) {
		item.addEventListener('contextmenu', function(ev) {
			ev.preventDefault();
			document.querySelectorAll('.js-contex_content').forEach(function(item) {
				item.classList.remove('active');
			});
			this.parentElement.querySelector('.js-contex_content').classList.add('active');
		}, false);
	})


	document.querySelector('.js-command_run').addEventListener('click', function(e) {
		e.preventDefault();

		var run_command = prompt('What command do you want to run?', 'about');


		var win_id = 1;
		document.querySelectorAll('.js-windows_container').forEach(function(item) {
			if(item.classList.contains('active')) {


				if(run_command !== 'about' && run_command !== 'files' && run_command !==  'projects' && run_command !==  'updates') {
					alert('command does not exist');
				} else {
					item.querySelector("[data-command='"+run_command+"']").classList.remove('hidden');
				}
				if(run_command === 'help') {
					alert('available commands: about, files, projects, updates');
				}


			}
		});


		console.log(run_command);
	});


	document.querySelectorAll('.js-command_project').forEach(function(item) {
		item.addEventListener('click',function(e) {
			e.preventDefault();
			var opt = this.dataset.project;


			var win_id = 1;
			document.querySelectorAll('.js-windows_container').forEach(function(item) {
				if(item.classList.contains('active')) {
					item.querySelector("[data-command='project_"+opt+"']").classList.remove('hidden');
					//item.querySelector("[data-command='project_a']").classList.remove('hidden');
					//item.querySelector("[data-command='project_b']").classList.remove('hidden');
					//item.querySelector("[data-command='project_c']").classList.remove('hidden');
				}
			});

		});
	});
});