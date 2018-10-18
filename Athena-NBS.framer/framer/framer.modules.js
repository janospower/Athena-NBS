require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nbs":[function(require,module,exports){
var Brick, Container, Listener, drawSVG,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.padding = 15;

exports.situationWidth = 300;

exports.borderradius = 4;

exports.primary = "#00203D";

exports.primaryDark = "#11151A";

exports.primaryLight = "#2A445C";

exports.secondary = "#CC0026";

exports.scrolled = 0;

exports.cont = null;

exports.listeners = [];

exports.nodeLinks = [];

drawSVG = function(x1, y1, x2, y2) {
  var svg;
  svg = '<svg> <circle cx="' + ("" + x1) + '" cy="' + ("" + y1) + '" r="4" stroke="none" fill="#FFFFFF" /> <path d="M' + (x1 + " " + y1) + ' C ' + (" " + (x1 + ((x2 - x1) * 0.5)) + " " + y1 + " " + (x1 + ((x2 - x1) * 0.5)) + " " + y2 + " " + x2 + " " + y2) + '" stroke="#FFFFFF" stroke-width="2" fill="none" /> <circle cx="' + ("" + x2) + '" cy="' + ("" + y2) + '" r="4" stroke="none" fill="#FFFFFF" /> </svg>';
  return svg;
};

exports.NodeLines = (function(superClass) {
  extend(NodeLines, superClass);

  function NodeLines(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      width: 2 * exports.padding,
      y: 0,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      },
      html: drawSVG(this.options.x1, this.options.y1, this.options.x2, 50)
    });
    NodeLines.__super__.constructor.call(this, this.options);
    this.x2 = this.options.x2;
    this.x1 = this.options.x1;
    this.y1 = this.options.y1;
    this.states.collapsed = {
      y: 0,
      scaleY: 0,
      height: 0,
      opacity: 0
    };
  }

  return NodeLines;

})(Layer);

Listener = (function(superClass) {
  extend(Listener, superClass);

  function Listener(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: 'transparent',
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primaryLight,
      width: exports.situationWidth - 2 * exports.padding,
      height: 40,
      x: exports.padding,
      y: 3 * exports.padding
    });
    Listener.__super__.constructor.call(this, this.options);
    this.label = new TextLayer({
      parent: this,
      text: "Event Listener",
      fontSize: 14,
      color: "white",
      point: Align.center
    });
  }

  return Listener;

})(Layer);

Brick = (function(superClass) {
  extend(Brick, superClass);

  function Brick(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 100,
      width: exports.situationWidth,
      x: 0,
      borderWidth: 1,
      borderRadius: exports.borderradius / 2,
      borderColor: exports.primaryLight
    });
    this.label = new TextLayer({
      text: this.options.title,
      fontSize: 14,
      color: "white",
      x: exports.padding,
      y: exports.padding
    });
    Brick.__super__.constructor.call(this, this.options);
    this.label.parent = this;
  }

  return Brick;

})(Layer);

Container = (function(superClass) {
  extend(Container, superClass);

  function Container(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      backgroundColor: null,
      y: 3 * exports.padding,
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    Container.__super__.constructor.call(this, this.options);
    this.scrollComp = new ScrollComponent({
      parent: this,
      width: exports.situationWidth,
      backgroundColor: 'transparent',
      scrollHorizontal: false,
      overdrag: true
    });
    this.scrollComp.mouseWheelEnabled = true;
    this.states.collapsed = {
      y: 3 * exports.padding,
      scaleY: 0,
      height: 0,
      opacity: 0
    };
  }

  return Container;

})(Layer);

exports.Situation = (function(superClass) {
  extend(Situation, superClass);

  function Situation(options) {
    var bricks, child, das, i, j, len, ref;
    this.options = options != null ? options : {};
    this.Toggle = bind(this.Toggle, this);
    this.label = new TextLayer({
      text: this.options.l,
      fontSize: 16,
      color: "white",
      textTransform: "uppercase",
      fontWeight: "700",
      letterSpacing: 2,
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primaryLight,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    Situation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.container = new Container({
      parent: this
    });
    bricks = [];
    ref = this.options.nodes;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      bricks.push(new Brick({
        y: i * 100,
        parent: this.container.scrollComp.content,
        title: child
      }));
    }
    exports.cont = this.container;
    bricks.push(this.newBrick = new Brick({
      y: bricks.length * 100,
      parent: exports.cont.scrollComp.content,
      title: "+ Add new brick"
    }));
    das = this;
    this.newBrick.onClick(function() {
      var brickName;
      brickName = prompt("Brick Name");
      bricks.pop();
      bricks.push(new Brick({
        y: bricks.length * 100,
        parent: das.container.scrollComp.content,
        title: brickName
      }));
      das.newBrick.visible = false;
      bricks.push(das.newBrick = new Brick({
        y: bricks.length * 100,
        parent: das.container.scrollComp.content,
        title: "+ Add new brick"
      }));
      if (das.container.scrollComp.content.height < 620) {
        return das.container.scrollComp.height = das.container.scrollComp.content.height;
      } else {
        return das.container.scrollComp.height = 620;
      }
    });
    exports.listeners.push(new Listener({
      parent: bricks[bricks.length - 2],
      name: "Listener"
    }));
    this.brick = bricks[bricks.length - 2];
    if (this.container.scrollComp.content.height < 620) {
      this.container.scrollComp.height = this.container.scrollComp.content.height;
    } else {
      this.container.scrollComp.height = 620;
    }
    this.tri = new Layer({
      parent: this,
      width: 20,
      height: 20,
      x: exports.padding,
      y: exports.padding,
      style: {
        "background": "url(images/tri.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      },
      animationOptions: {
        time: 0.2,
        curve: Bezier.ease
      }
    });
    this.tri.states.collapsed = {
      rotation: -90
    };
    this.nodeLine = new exports.NodeLines({
      parent: this.options.p,
      x: 0,
      y: 0,
      width: screen.width,
      height: screen.height,
      y1: this.brick.screenFrame.y + this.brick.height / 2 + exports.padding,
      x1: this.x + this.width - exports.padding,
      x2: this.x + this.width + 2 * exports.padding
    });
    exports.nodeLinks.push(this.nodeLine);
    this.tri.onClick(this.Toggle);
  }

  Situation.prototype.Toggle = function() {
    this.container.stateCycle("collapsed", "default");
    this.tri.stateCycle("collapsed", "default");
    return this.nodeLine.stateCycle("collapsed", "default");
  };

  return Situation;

})(Layer);

exports.DragHandle = (function(superClass) {
  extend(DragHandle, superClass);

  function DragHandle(options) {
    var last, that;
    this.options = options != null ? options : {};
    that = this.options.p;
    last = this.options.plast;
    _.defaults(this.options, {
      width: 20,
      height: 20,
      x: that.x + that.width - 20 - exports.padding,
      y: that.y + exports.padding,
      style: {
        "background": "url(images/Icons/drag.svg)   no-repeat",
        "background-position": "left center",
        "background-size": "contain"
      }
    });
    DragHandle.__super__.constructor.call(this, this.options);
    this.draggable.enabled = true;
    this.draggable.constraints = {
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    this.on(Events.Move, function() {
      var lastx1, lastx2, lasty1, lasty2, x1, x2, y1;
      that.x = this.x - that.width + exports.padding + 20;
      that.y = this.y - exports.padding;
      that.bringToFront();
      y1 = that.brick.screenFrame.y + that.brick.height / 2 + exports.padding;
      x1 = that.brick.screenFrame.x + that.brick.width - exports.padding - exports.scrolled;
      x2 = that.nodeLine.x2;
      that.nodeLine.html = drawSVG(x1, y1, x2, 50);
      if (last) {
        lasty2 = this.screenFrame.y + this.height / 2;
        lastx2 = that.brick.screenFrame.x - exports.scrolled;
        lastx1 = last.nodeLine.x1;
        lasty1 = last.nodeLine.y1;
        return last.nodeLine.html = drawSVG(lastx1, lasty1, lastx2, lasty2);
      }
    });
  }

  return DragHandle;

})(Layer);

exports.NewSituation = (function(superClass) {
  extend(NewSituation, superClass);

  function NewSituation(options) {
    this.options = options != null ? options : {};
    this.label = new TextLayer({
      text: "New Situation",
      fontSize: 16,
      color: "white",
      textTransform: "uppercase",
      fontWeight: "700",
      letterSpacing: 2,
      x: 3 * exports.padding,
      y: exports.padding
    });
    _.defaults(this.options, {
      backgroundColor: exports.primary,
      height: 3 * exports.padding + exports.borderradius,
      width: exports.situationWidth,
      borderRadius: exports.borderradius,
      borderWidth: 1,
      borderColor: exports.primaryLight,
      x: 2 * exports.padding,
      y: 2 * exports.padding
    });
    NewSituation.__super__.constructor.call(this, this.options);
    this.label.parent = this;
    this.container = new Container({
      parent: this
    });
    this.newBrick = new Brick({
      y: 0,
      parent: this.container,
      title: "+ Add new brick"
    });
    this.newBrick.onClick(function() {
      var brickName;
      return brickName = prompt("Brick Name");
    });
  }

  return NewSituation;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2phbm9zL1NpdGVzL0F0aGVuYS1OQlMvQXRoZW5hLU5CUy5mcmFtZXIvbW9kdWxlcy9uYnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLnBhZGRpbmcgPSAxNVxuZXhwb3J0cy5zaXR1YXRpb25XaWR0aCA9IDMwMFxuZXhwb3J0cy5ib3JkZXJyYWRpdXMgPSA0XG5cbmV4cG9ydHMucHJpbWFyeSA9IFwiIzAwMjAzRFwiXG5leHBvcnRzLnByaW1hcnlEYXJrID0gXCIjMTExNTFBXCJcbmV4cG9ydHMucHJpbWFyeUxpZ2h0ID0gXCIjMkE0NDVDXCJcbmV4cG9ydHMuc2Vjb25kYXJ5ID0gXCIjQ0MwMDI2XCJcblxuZXhwb3J0cy5zY3JvbGxlZCA9IDBcblxuZXhwb3J0cy5jb250ID0gbnVsbFxuXG5leHBvcnRzLmxpc3RlbmVycyA9IFtdXG5leHBvcnRzLm5vZGVMaW5rcyA9IFtdXG5cbmRyYXdTVkcgPSAoeDEseTEseDIseTIpIC0+XG5cdHN2ZyA9ICdcblx0PHN2Zz5cblx0XHQ8Y2lyY2xlIGN4PVwiJysgXCIje3gxfVwiICsnXCIgY3k9XCInKyBcIiN7eTF9XCIgKydcIiByPVwiNFwiIHN0cm9rZT1cIm5vbmVcIiBmaWxsPVwiI0ZGRkZGRlwiIC8+XG5cdFx0PHBhdGggZD1cIk0nKyBcIiN7eDF9ICN7eTF9XCIgKycgQyAnK1wiICN7eDErKCh4Mi14MSkqMC41KX0gI3t5MX0gI3t4MSsoKHgyLXgxKSowLjUpfSAje3kyfSAje3gyfSAje3kyfVwiICsnXCIgc3Ryb2tlPVwiI0ZGRkZGRlwiIHN0cm9rZS13aWR0aD1cIjJcIiBmaWxsPVwibm9uZVwiIC8+XG5cdFx0PGNpcmNsZSBjeD1cIicrIFwiI3t4Mn1cIiArJ1wiIGN5PVwiJysgXCIje3kyfVwiICsnXCIgcj1cIjRcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiNGRkZGRkZcIiAvPlxuXHQ8L3N2Zz5cblx0J1xuXHRyZXR1cm4gc3ZnXG5cbmNsYXNzIGV4cG9ydHMuTm9kZUxpbmVzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogMFxuXHRcdFx0YW5pbWF0aW9uT3B0aW9uczpcblx0XHRcdFx0dGltZTowLjJcblx0XHRcdFx0Y3VydmU6IEJlemllci5lYXNlXG5cdFx0XHRodG1sOiBkcmF3U1ZHKEBvcHRpb25zLngxLEBvcHRpb25zLnkxLEBvcHRpb25zLngyLDUwKVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAeDIgPSBAb3B0aW9ucy54MlxuXHRcdEB4MSA9IEBvcHRpb25zLngxXG5cdFx0QHkxID0gQG9wdGlvbnMueTFcblx0XHRALnN0YXRlcy5jb2xsYXBzZWQ9XG5cdFx0XHR5OiAwXG5cdFx0XHRzY2FsZVk6IDBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0b3BhY2l0eTogMFxuXG5cblxuY2xhc3MgTGlzdGVuZXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlckNvbG9yOiBleHBvcnRzLnByaW1hcnlMaWdodFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGggLSAyKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0aGVpZ2h0OiA0MFxuXHRcdFx0eDogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAzKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCJFdmVudCBMaXN0ZW5lclwiXG5cdFx0XHRmb250U2l6ZTogMTRcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHBvaW50OiBBbGlnbi5jZW50ZXJcblxuXG5jbGFzcyBCcmljayBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHR3aWR0aDogZXhwb3J0cy5zaXR1YXRpb25XaWR0aFxuXHRcdFx0eDogMFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDFcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXMvMlxuXHRcdFx0Ym9yZGVyQ29sb3I6IGV4cG9ydHMucHJpbWFyeUxpZ2h0XG5cblx0XHRAbGFiZWwgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE0XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR4OiBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IGV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblxuXG5cblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHk6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2Nyb2xsQ29tcCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdG92ZXJkcmFnOiB0cnVlXG5cblx0XHRAc2Nyb2xsQ29tcC5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblxuXG5cdFx0QC5zdGF0ZXMuY29sbGFwc2VkPVxuXHRcdFx0eTogMypleHBvcnRzLnBhZGRpbmdcblx0XHRcdHNjYWxlWTogMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRvcGFjaXR5OiAwXG5cblxuXG5cblxuY2xhc3MgZXhwb3J0cy5TaXR1YXRpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QGxhYmVsID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogQG9wdGlvbnMubFxuXHRcdFx0Zm9udFNpemU6IDE2XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiXG5cdFx0XHRmb250V2VpZ2h0OiBcIjcwMFwiXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAyXG5cdFx0XHR4OiAzKmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRicmlja3MgPSBbXVxuXHRcdGZvciBjaGlsZCwgaSBpbiBAb3B0aW9ucy5ub2Rlc1xuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGkqMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdFx0dGl0bGU6IGNoaWxkXG5cblx0XHRleHBvcnRzLmNvbnQgPSBAY29udGFpbmVyXG5cdFx0YnJpY2tzLnB1c2ggQG5ld0JyaWNrID0gbmV3IEJyaWNrXG5cdFx0XHR5OiBicmlja3MubGVuZ3RoKjEwMFxuXHRcdFx0cGFyZW50OiBleHBvcnRzLmNvbnQuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHR0aXRsZTogXCIrIEFkZCBuZXcgYnJpY2tcIlxuXG5cdFx0ZGFzID0gQFxuXHRcdEBuZXdCcmljay5vbkNsaWNrIC0+XG5cdFx0XHRicmlja05hbWUgPSBwcm9tcHQgXCJCcmljayBOYW1lXCJcblx0XHRcdGJyaWNrcy5wb3AoKVxuXHRcdFx0YnJpY2tzLnB1c2ggbmV3IEJyaWNrXG5cdFx0XHRcdHk6IGJyaWNrcy5sZW5ndGgqMTAwXG5cdFx0XHRcdHBhcmVudDogZGFzLmNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnRcblx0XHRcdFx0dGl0bGU6IGJyaWNrTmFtZVxuXHRcdFx0ZGFzLm5ld0JyaWNrLnZpc2libGU9ZmFsc2Vcblx0XHRcdGJyaWNrcy5wdXNoIGRhcy5uZXdCcmljayA9IG5ldyBCcmlja1xuXHRcdFx0XHR5OiBicmlja3MubGVuZ3RoKjEwMFxuXHRcdFx0XHRwYXJlbnQ6IGRhcy5jb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50XG5cdFx0XHRcdHRpdGxlOiBcIisgQWRkIG5ldyBicmlja1wiXG5cdFx0XHRpZiAoZGFzLmNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0IDwgNjIwKVxuXHRcdFx0XHRkYXMuY29udGFpbmVyLnNjcm9sbENvbXAuaGVpZ2h0ID0gZGFzLmNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGRhcy5jb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSA2MjBcblxuXHRcdGV4cG9ydHMubGlzdGVuZXJzLnB1c2ggbmV3IExpc3RlbmVyXG5cdFx0XHRwYXJlbnQ6IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cdFx0XHRuYW1lOiBcIkxpc3RlbmVyXCJcblxuXHRcdEBicmljayA9IGJyaWNrc1ticmlja3MubGVuZ3RoLTJdXG5cblx0XHRpZiAoQGNvbnRhaW5lci5zY3JvbGxDb21wLmNvbnRlbnQuaGVpZ2h0IDwgNjIwKVxuXHRcdFx0QGNvbnRhaW5lci5zY3JvbGxDb21wLmhlaWdodCA9IEBjb250YWluZXIuc2Nyb2xsQ29tcC5jb250ZW50LmhlaWdodFxuXHRcdGVsc2Vcblx0XHRcdEBjb250YWluZXIuc2Nyb2xsQ29tcC5oZWlnaHQgPSA2MjBcblxuXHRcdEB0cmkgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHR4OmV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvdHJpLnN2ZykgICBuby1yZXBlYXRcIlxuXHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIjpcImxlZnQgY2VudGVyXCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXNpemVcIiA6IFwiY29udGFpblwiXG5cdFx0XHRhbmltYXRpb25PcHRpb25zOlxuXHRcdFx0XHR0aW1lOjAuMlxuXHRcdFx0XHRjdXJ2ZTogQmV6aWVyLmVhc2VcblxuXHRcdEB0cmkuc3RhdGVzLmNvbGxhcHNlZD1cblx0XHRcdHJvdGF0aW9uOiAtOTBcblxuXG5cdFx0QG5vZGVMaW5lID0gbmV3IGV4cG9ydHMuTm9kZUxpbmVzXG5cdFx0XHRwYXJlbnQgOiBAb3B0aW9ucy5wXG5cdFx0XHR4OiAwI0AueCArIEAud2lkdGggLSBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHk6IDAjMipleHBvcnRzLnBhZGRpbmdcblx0XHRcdHdpZHRoOiBzY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogc2NyZWVuLmhlaWdodFxuXHRcdFx0eTE6IEBicmljay5zY3JlZW5GcmFtZS55ICsgQGJyaWNrLmhlaWdodC8yICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR4MTogQC54ICsgQC53aWR0aCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eDI6IEAueCArIEAud2lkdGggKyAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0ZXhwb3J0cy5ub2RlTGlua3MucHVzaCBAbm9kZUxpbmVcblxuXHRcdEB0cmkub25DbGljayBAVG9nZ2xlXG5cblx0VG9nZ2xlOiA9PlxuXHRcdEBjb250YWluZXIuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEB0cmkuc3RhdGVDeWNsZSBcImNvbGxhcHNlZFwiLCBcImRlZmF1bHRcIlxuXHRcdEBub2RlTGluZS5zdGF0ZUN5Y2xlIFwiY29sbGFwc2VkXCIsIFwiZGVmYXVsdFwiXG5cblxuXG5cblxuXG5jbGFzcyBleHBvcnRzLkRyYWdIYW5kbGUgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dGhhdCA9IEBvcHRpb25zLnBcblx0XHRsYXN0ID0gQG9wdGlvbnMucGxhc3RcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdHg6IHRoYXQueCArIHRoYXQud2lkdGggLSAyMCAtIGV4cG9ydHMucGFkZGluZ1xuXHRcdFx0eTogdGhhdC55ICsgZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHRzdHlsZTpcblx0XHRcdFx0XCJiYWNrZ3JvdW5kXCIgOiBcInVybChpbWFnZXMvSWNvbnMvZHJhZy5zdmcpICAgbm8tcmVwZWF0XCJcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6XCJsZWZ0IGNlbnRlclwiXG5cdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvbnRhaW5cIlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRALmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEAuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID0ge1xuXHRcdFx0eDogQC54XG5cdFx0XHR5OiBALnlcblx0XHRcdHdpZHRoOiAwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHR9XG5cdFx0QC5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRcdHRoYXQueCA9IEAueCAtIHRoYXQud2lkdGggKyBleHBvcnRzLnBhZGRpbmcgKyAyMFxuXHRcdFx0dGhhdC55ID0gQC55IC0gZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR0aGF0LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHR5MSA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueSArIHRoYXQuYnJpY2suaGVpZ2h0LzIgKyBleHBvcnRzLnBhZGRpbmdcblx0XHRcdHgxID0gdGhhdC5icmljay5zY3JlZW5GcmFtZS54ICsgdGhhdC5icmljay53aWR0aCAtIGV4cG9ydHMucGFkZGluZyAtIGV4cG9ydHMuc2Nyb2xsZWRcblx0XHRcdHgyID0gdGhhdC5ub2RlTGluZS54MlxuXHRcdFx0dGhhdC5ub2RlTGluZS5odG1sID0gZHJhd1NWRyh4MSx5MSx4Miw1MClcblxuXHRcdFx0aWYgbGFzdFxuXHRcdFx0XHRsYXN0eTIgPSBALnNjcmVlbkZyYW1lLnkgKyBALmhlaWdodC8yXG5cdFx0XHRcdGxhc3R4MiA9IHRoYXQuYnJpY2suc2NyZWVuRnJhbWUueCAtIGV4cG9ydHMuc2Nyb2xsZWRcblx0XHRcdFx0bGFzdHgxID0gbGFzdC5ub2RlTGluZS54MVxuXHRcdFx0XHRsYXN0eTEgPSBsYXN0Lm5vZGVMaW5lLnkxXG5cdFx0XHRcdGxhc3Qubm9kZUxpbmUuaHRtbCA9IGRyYXdTVkcobGFzdHgxLGxhc3R5MSxsYXN0eDIsbGFzdHkyKVxuXG5cbmNsYXNzIGV4cG9ydHMuTmV3U2l0dWF0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBsYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IFwiTmV3IFNpdHVhdGlvblwiXG5cdFx0XHRmb250U2l6ZTogMTZcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6IFwiNzAwXCJcblx0XHRcdGxldHRlclNwYWNpbmc6IDJcblx0XHRcdHg6IDMqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiBleHBvcnRzLnBhZGRpbmdcblxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBleHBvcnRzLnByaW1hcnlcblx0XHRcdGhlaWdodDogMypleHBvcnRzLnBhZGRpbmcgKyBleHBvcnRzLmJvcmRlcnJhZGl1c1xuXHRcdFx0d2lkdGg6IGV4cG9ydHMuc2l0dWF0aW9uV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogZXhwb3J0cy5ib3JkZXJyYWRpdXNcblx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHRib3JkZXJDb2xvcjogZXhwb3J0cy5wcmltYXJ5TGlnaHRcblx0XHRcdHg6IDIqZXhwb3J0cy5wYWRkaW5nXG5cdFx0XHR5OiAyKmV4cG9ydHMucGFkZGluZ1xuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBsYWJlbC5wYXJlbnQgPSBAXG5cblx0XHRAY29udGFpbmVyID0gbmV3IENvbnRhaW5lclxuXHRcdFx0cGFyZW50OiBAXG5cblx0XHRAbmV3QnJpY2sgPSBuZXcgQnJpY2tcblx0XHRcdHk6IDBcblx0XHRcdHBhcmVudDogQGNvbnRhaW5lclxuXHRcdFx0dGl0bGU6IFwiKyBBZGQgbmV3IGJyaWNrXCJcblxuXHRcdEBuZXdCcmljay5vbkNsaWNrIC0+XG5cdFx0XHRicmlja05hbWUgPSBwcm9tcHQgXCJCcmljayBOYW1lXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEQUEsSUFBQSxtQ0FBQTtFQUFBOzs7O0FBQUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCOztBQUN6QixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFFdkIsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCOztB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
