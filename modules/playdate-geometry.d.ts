declare function affineTransformInit(this: void, m11: number, m12: number, m21: number, m22: number, tx: number, ty: number): PlaydateAffineTransform;
declare function affineTransformInit(this: void): PlaydateAffineTransform;

/**
 * Affine transforms can be used to modify the coordinates of points, rects (as axis aligned bounding boxes (AABBs)), line segments, and polygons.
 * The underlying matrix is of the form:
 * @example
 * [m11 m12 tx]
 * [m21 m22 ty]
 * [ 0   0  1 ]
 */
declare type PlaydateAffineTransform = {
	/**
	 * Returns a new playdate.geometry.affineTransform.
	 * Use new() instead to get a new copy of the identity transform.
	 */
	new: typeof affineTransformInit;
	/**
	 * Returns a new copy of the affine transform.
	 */
	copy(): PlaydateAffineTransform;
	/**
	 * Mutates the caller so that it is an affine transformation matrix constructed by inverting itself.
	 * 
	 * Inversion is generally used to provide reverse transformation of points within transformed objects.
	 * Given the coordinates (x, y), which have been transformed by a given matrix to new coordinates (x’, y’), transforming the coordinates (x’, y’) by the inverse matrix produces the original coordinates (x, y).
	 */
	invert(): void;
	/**
	 * Mutates the the caller, changing it to an identity transform matrix.
	 */
	reset(): void;
	/**
	 * Mutates the the caller. The affine transform af is concatenated to the caller.
	 * 
	 * Concatenation combines two affine transformation matrices by multiplying them together.
	 * You might perform several concatenations in order to create a single affine transform that contains the cumulative effects of several transformations.
	 * 
	 * Note that matrix operations are not commutative — the order in which you concatenate matrices is important.
	 * That is, the result of multiplying matrix t1 by matrix t2 does not necessarily equal the result of multiplying matrix t2 by matrix t1.
	 */
	concat(af: PlaydateAffineTransform): void;
	/**
	 * Mutates the caller by applying a translate transformation. x values are moved by dx, y values by dy.
	 */
	translate(dx: number, dy: number): void;
	/**
	 * Returns a copy of the calling affine transform with a translate transformation appended.
	 */
	translatedBy(dx: number, dy: number): PlaydateAffineTransform;
	/**
	 * Mutates the caller by applying a scaling transformation.
	 * 
	 * If both parameters are passed, sx is used to scale the x values of the transform, sy is used to scale the y values.
	 * 
	 * If only one parameter is passed, it is used to scale both x and y values.
	 */
	scale(sx: number, sy?: number): void;
	/**
	 * Returns a copy of the calling affine transform with a scaling transformation appended.
	 * 
	 * If both parameters are passed, sx is used to scale the x values of the transform, sy is used to scale the y values.
	 * 
	 * If only one parameter is passed, it is used to scale both x and y values.
	 */
	scaledBy(sx: number, sy?: number): PlaydateAffineTransform;
	/**
	 * Mutates the caller by applying a rotation transformation.
	 * 
	 * @param angle is the value, in degrees, by which to rotate the affine transform.
	 * A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation.
	 * If the optional x and y arguments or {@link playdate.geometry.point} point are given, the transform rotates around (x,y) or point instead of (0,0).
	 */
	rotate(angle: number, x?: number, y?: number): void;
	rotate(angle: number, point?: PlaydatePoint): void;
	/**
	 * Returns a copy of the calling affine transform with a rotate transformation appended.
	 * 
	 * @param angle is the value, in degrees, by which to rotate the affine transform.
	 * A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation.
	 * If the optional x and y arguments or {@link playdate.geometry.point} point are given, the transform rotates around (x,y) or point instead of (0,0).
	 */
	rotatedBy(angle: number, x?: number, y?: number): PlaydateAffineTransform;
	rotatedBy(angle: number, point?: PlaydatePoint): PlaydateAffineTransform;
	/**
	 * Mutates the caller, appending a skew transformation.
	 * 
	 * Values are in degrees.
	 * 
	 * @param sx - is the value by which to skew the x axis
	 * @param sy - the value for the y axis.
	 */
	skew(sx: number, sy: number): void;
	/**
	 * Returns the given transform with a skew transformation appended.
	 * 
	 * Values are in degrees.
	 * 
	 * @param sx - is the value by which to skew the x axis
	 * @param sy - the value for the y axis.
	 */
	skewedBy(sx: number, sy: number): PlaydateAffineTransform;
	/**
	 * Modifies the {@link playdate.geometry.point} p by applying the affine transform.
	 */
	transformPoint(p: PlaydatePoint): void;
	/**
	 * As above, but returns a new point rather than modifying p.
	 */
	transformedPoint(p: PlaydatePoint): PlaydatePoint;
	/**
	 * Returns two values calculated by applying the affine transform to the point (x, y)
	 */
	transformXY(x: number, y: number): LuaMultiReturn<[number, number]>;
	/**
	 * Modifies the {@link playdate.geometry.lineSegment} ls by applying the affine transform.
	 */
	transformLineSegment(ls: PlaydateLineSegment): void;
	/**
	 * As above, but returns a new {@link playdate.geometry.lineSegment} rather than modifying ls.
	 */
	transformedLineSegment(ls: PlaydateLineSegment): PlaydateLineSegment;
	/**
	 * Modifies the axis aligned bounding box r (a {@link playdate.geometry.rect}) by applying the affine transform.
	 */
	transformAABB(r: PlaydateRect): void;
	/**
	 * As above, but returns a new {@link playdate.geometry.rect} rather than modifying r.
	 */
	transformedAABB(r: PlaydateRect): PlaydateRect;
	/**
	 * Modifies the {@link playdate.geometry.polygon} p by applying the affine transform.
	 */
	transformPolygon(p: PlaydatePolygon): void;
	/**
	 * As above, but returns a new {@link playdate.geometry.polygon} rather than modifying p.
	 */
	transformedPolygon(p: PlaydatePolygon): PlaydatePolygon;

	mul: LuaMultiplicationMethod<PlaydateAffineTransform, PlaydateAffineTransform>
		& LuaMultiplicationMethod<PlaydateVector2D, PlaydateVector2D>
		& LuaMultiplicationMethod<PlaydatePoint, PlaydatePoint>;
}

/**
 * You can directly read or write the x, y, radius, startAngle, endAngle and clockwise values of an arc.
 */
declare type PlaydateArc = {
	/**
	 * Returns a new playdate.geometry.arc. Angles should be specified in degrees.
	 * Zero degrees represents the top of the circle.
	 * 
	 * If specified, direction should be true for clockwise, false for counterclockwise.
	 * If not specified, the direction is inferred from the start and end angles.
	 */
	new: (this: void, x: number, y: number, radius: number, startAngle: number, endAngle: number, direction?: boolean) => PlaydateArc;
	/**
	 * Returns a new copy of the arc.
	 */
	copy(): PlaydateArc;
	/**
	 * Returns the length of the arc.
	 */
	length(): number;
	/**
	 * Returns true if the direction of the arc is clockwise.
	 */
	isClockwise(): boolean;
	/**
	 * Sets the direction of the arc.
	 */
	setIsClockwise(flag: boolean): void;
	/**
	 * Returns a new point on the arc
	 * @param distance pixels from the arc’s start angle.
	 */
	pointOnArc(distance: number): PlaydatePoint;
}

/**
 * Implements a line segment between two points in two-dimensional space.
 * 
 * You can directly read or write x1, y1, x2, or y2 values to a lineSegment.
 */
declare type PlaydateLineSegment = {
	/**
	 * Returns a new playdate.geometry.lineSegment.
	 */
	new: (this: void, x1: number, y1: number, x2: number, y2: number) => PlaydateLineSegment;
	/**
	 * Returns a new copy of the line segment.
	 */
	copy(): PlaydateLineSegment;
	/**
	 * Returns the values x1, y1, x2, y2.
	 */
	unpack(): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Returns the length of the line segment.
	 */
	length(): number;
	/**
	 * Modifies the line segment, offsetting its values by dx, dy.
	 */
	offset(dx: number, dy: number): void;
	/**
	 * Returns a new line segment, the given segment offset by dx, dy.
	 */
	offsetBy(dx: number, dy: number): PlaydateLineSegment;
	/**
	 * Returns a {@link playdate.geometry.point} representing the mid point of the line segment.
	 */
	midPoint(): PlaydatePoint;
	/**
	 * Returns a {@link playdate.geometry.point} on the line segment
	 * @param distance pixels from the start of the line.
	 */
	pointOnLine(distance: number): PlaydatePoint;
	/**
	 * Returns a {@link playdate.geometry.vector2D} representation of the line segment.
	 */
	segmentVector(): PlaydateVector2D;
	/**
	 * Returns a {@link playdate.geometry.point} that is the closest point to point p that is on the line segment.
	 */
	closestPointOnLineToPoint(p: PlaydatePoint): PlaydatePoint;
	/**
	 * Returns true if there is an intersection between the caller and the line segment ls.
	 * 
	 * If there is an intersection, a {@link playdate.geometry.point} representing that point is also returned.
	 */
	intersectsLineSegment(ls: PlaydateLineSegment): LuaMultiReturn<[boolean, PlaydatePoint]>;
	/**
	 * For use in inner loops where speed is the priority.
	 * 
	 * Returns true if there is an intersection between the line segments defined by (x1, y1), (x2, y2) and (x3, y3), (x4, y4).
	 * If there is an intersection, x, y values representing the intersection point are also returned.
	 */
	fast_intersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): LuaMultiReturn<[boolean, number, number]>;
	// TODO: Verify this return value is correct
	/**
	 * Returns the tuple (intersects, intersectionPoints).
	 * 
	 * intersects is true if there is at least one intersection between the caller and poly.
	 * 
	 * intersectionPoints is an array of {@link playdate.geometry.point}s containing all intersection points between the caller and poly.
	 */
	intersectsPolygon(poly: PlaydatePolygon): LuaMultiReturn<[boolean, PlaydatePoint[]]>;
	/**
	 * Returns the tuple (intersects, intersectionPoints).
	 * 
	 * intersects is true if there is at least one intersection between the caller and rect.
	 * 
	 * intersectionPoints is an array of {@link playdate.geometry.point}s containing all intersection points between the caller and rect.
	 */
	intersectsRect(rect: PlaydateRect): LuaMultiReturn<[boolean, PlaydatePoint[]]>;
}

/**
 * playdate.geometry.point implements a two-dimensional point. You can directly read or write the x and y values of a point.
 */
declare type PlaydatePoint = {
	/**
	 * Returns a new playdate.geometry.point.
	 */
	new: (this: void, x: number, y: number) => PlaydatePoint;
	/**
	 * Returns a new copy of the point.
	 */
	copy(): PlaydatePoint;
	/**
	 * Returns the values x, y.
	 */
	unpack(): LuaMultiReturn<[number, number]>;
	/**
	 * Modifies the point, offsetting its values by dx, dy.
	 */
	offset(dx: number, dy: number): void;
	/**
	 * Returns a new point object, the given point offset by dx, dy.
	 */
	offsetBy(dx: number, dy: number): PlaydatePoint;
	/**
	 * Returns the square of the distance to point p.
	 */
	squaredDistanceToPoint(p: PlaydatePoint): number;
	/**
	 * Returns the distance to point p.
	 */
	distanceToPoint(p: PlaydatePoint): number;

	/**
	 * Returns a new point by adding the vector v to point p.
	 */
	add: LuaAdditionMethod<PlaydateVector2D, PlaydatePoint>;
	/**
	 * Returns the vector constructed by subtracting p2 from p1. By this construction, p2 + (p1 - p2) == p1.
	 */
	sub: LuaSubtractionMethod<PlaydatePoint, PlaydateVector2D>;
	/**
	 * Returns a new point by applying the transform t to point p.
	 */
	mul: LuaMultiplicationMethod<PlaydateAffineTransform, PlaydatePoint>;
	/**
	 * Returns a new lineSegment connecting points p1 and p2.
	 */
	concat: LuaConcatMethod<PlaydatePoint, PlaydateLineSegment>;
}

// TODO: Limit this to only even number of parameters
/**
 * new(x1, y1, x2, y2, …​, xn, yn) returns a new playdate.geometry.polygon with vertices (x1, y1) through (xn, yn).
 * The Lua function table.unpack() can be used to turn an array into function arguments.
 */
declare function polygonInit(this: void, ...xy: number[]): PlaydatePolygon;
/**
 * new(p1, p2, …​, pn) does the same, except the points are expressed via point objects.
 */
declare function polygonInit(this: void, ...p: PlaydatePoint[]): PlaydatePolygon;
/**
 * new(numberOfVertices) returns a new playdate.geometry.polygon with space allocated for numberOfVertices vertices.
 * All vertices are initially (0, 0).
 * Vertex coordinates can be set with {@link playdate.geometry.polygon.setPointAt()}.
 */
declare function polygonInit(this: void, numberOfVertices: number): PlaydatePolygon;
/**
 * playdate.geometry.polygon implements two-dimensional open or closed polygons.
 * 
 * @remarks
 * If the polygon’s first and last points are coincident, the polygon will be considered closed.
 * Alternatively, you may call .close() to automatically close the polygon. 
 * 
 * To draw a polygon, use {@link playdate.graphics.drawPolygon()}.
 */
declare type PlaydatePolygon = {
	new: typeof polygonInit;
	/**
	 * Returns a copy of a polygon.
	 */
	copy(): PlaydatePolygon;
	/**
	 * closes a polygon.
	 * If the polygon’s first and last point aren’t coincident, a line segment will be generated to connect them.
	 */
	close(): void;
	/**
	 * Returns true if the polygon is closed, false if not.
	 */
	isClosed(): boolean;
	// TODO: define fillrule type
	/**
	 * Returns a boolean value, true if the point p is contained within the caller polygon.
	 * @param fillRule optional argument that can be one of the values defined in {@link playdate.graphics.setPolygonFillRule}.
	 * By default {@link playdate.graphics.kPolygonFillEvenOdd} is used.
	 */
	containsPoint(p: PlaydatePoint, fillRule: number): boolean;
	/**
	 * Returns a boolean value, true if the point at (x, y) is contained within the caller polygon.
	 * @param fillRule optional argument that can be one of the values defined in {@link playdate.graphics.setPolygonFillRule}.
	 * By default {@link playdate.graphics.kPolygonFillEvenOdd} is used.
	 */
	containsPoint(x: number, y: number, fillRule: number): boolean;
	/**
	 * Returns the axis-aligned bounding box for the given polygon as the tuple (x, y, width, height).
	 */
	getBound(): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Returns the axis-aligned bounding box for the given polygon as a {@link playdate.geometry.rect} object.
	 */
	getBoundsRect(): PlaydateRect;
	/**
	 * Returns the number of points in the polygon.
	 */
	count(): number;
	/**
	 * Returns the total length of all line segments in the polygon.
	 */
	length(): number;
	/**
	 * Sets the polygon’s n-th point to (x, y)
	 */
	setPointAt(n: number, x: number, y: number): void;
	// TODO: verify return value
	/**
	 * Returns the polygon’s n-th point.
	 */
	getPointAt(n: number): PlaydatePoint;
	/**
	 * Returns true if the given polygon intersects the polygon p
	 */
	insersects(p: PlaydatePolygon): boolean;
	/**
	 * Returns a {@link playdate.geometry.point} on one of the polygon’s line segments
	 * @param distance pixels from the start of the polygon.
	 */
	pointOnPolygon(distance: number): PlaydatePoint;
	/**
	 * Translates each point on the polygon by dx, dy pi
	 */
	translate(dx: number, dy: number): void;

	/**
	 * Returns a new polygon formed by applying the transform t to polygon p.
	 */
	mul: LuaMultiplicationMethod<PlaydateAffineTransform, PlaydatePolygon>;
}

/**
 * playdate.geometry.rect implements a rectangle.
 * 
 * You can directly read or write x, y, width, or height values to a rect.
 * 
 * The values of top, bottom, right, left, origin, and size are read-only.
 */
declare type PlaydateRect = {
	/**
	 * Returns a new playdate.geometry.rect.
	 */
	new: (this: void, x: number, y: number, width: number, height: number) => PlaydateRect;
	/**
	 * Returns a new copy of the rect.
	 */
	copy(): PlaydateRect;
	/**
	 * Returns a new playdate.geometry.polygon version of the rect.
	 */
	toPolygon(): PlaydatePolygon;
	/**
	 * Returns x, y, width and height as individual values.
	 */
	unpack(): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Returns true if a rectangle has zero width or height.
	 */
	isEmpty(): boolean;
	/**
	 * Returns true if the x, y, width, and height values of the caller and r2 are all equal.
	 */
	isEqual(r2: PlaydateRect): boolean;
	/**
	 * Returns true if r2 intersects the caller.
	 */
	insersects(r2: PlaydateRect): boolean;
	/**
	 * Returns a rect representing the overlapping portion of the caller and r2.
	 */
	intersection(r2: PlaydateRect): PlaydateRect;
	/**
	 * For use in inner loops where speed is the priority. About 3x faster than intersection.
	 * 
	 * Returns a tuple (x, y, width, height) representing the overlapping portion of the two rects defined by x1, y1, w1, h1 and x2, y2, w2, h2.
	 * If there is no intersection, (0, 0, 0, 0) is returned.
	 */
	fast_intersection(this: void, x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Returns the smallest possible rect that contains both the source rect and r2.
	 */
	union(r2: PlaydateRect): PlaydateRect;
	/**
	 * For use in inner loops where speed is the priority. About 3x faster than {@link playdate.geometry.rect.union}.
	 * 
	 * Returns a tuple (x, y, width, height) representing the smallest possible rect that contains the two rects defined by x1, y1, w1, h1 and x2, y2, w2, h2.
	 */
	fast_union(this: void, x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): LuaMultiReturn<[number, number, number, number]>;
	/**
	 * Insets the rect by the given dx and dy.
	 */
	inset(dx: number, dy: number): void;
	/**
	 * Returns a rect that is inset by the given dx and dy, with the same center point.
	 */
	insetBy(dx: number, dy: number): PlaydateRect;
	/**
	 * Offsets the rect by the given dx and dy.
	 */
	offset(dx: number, dy: number): void;
	/**
	 * Returns a rect with its origin point offset by dx, dy.
	 */
	offsetBy(dx: number, dy: number): PlaydateRect;
	/**
	 * Returns true if the rect r2 is contained within the caller rect.
	 */
	containsRect(r2: PlaydateRect): boolean;
	/**
	 * Returns true if the rect defined by (x, y, width, height) is contained within the caller rect.
	 */
	containsRect(x: number, y: number, width: number, height: number): boolean;
	/**
	 * Returns true if the point p is contained within the caller rect.
	 */
	containsPoint(p: PlaydatePoint): boolean;
	/**
	 * Returns true if the point at (x, y) is contained within the caller rect.
	 */
	containsPoint(x: number, y: number): boolean;
	/**
	 * Returns a point at the center of the caller.
	 */
	centerPoint(): PlaydatePoint;
	/**
	 * Flips the caller about the center of rect r2.
	 * @param flip should be one of the following constants:
	 * - playdate.geometry.kUnflipped
	 * - playdate.geometry.kFlippedX
	 * - playdate.geometry.kFlippedY
	 * - playdate.geometry.kFlippedXY
	 */
	flipRelativeToRect(r2: PlaydateRect, flip: PlaydateGeometryFlipConstant): void;
}

declare type PlaydateSize = {
	new: (this: void, width: number, height: number) => PlaydateSize;
	/**
	 * Returns a new copy of the size.
	 */
	copy(): PlaydateSize;
	/**
	 * Returns the values width, height.
	 */
	unpack(): LuaMultiReturn<[number, number]>;
}

/**
 * playdate.geometry.vector2D implements a two-dimensional vecto
 * 
 * You can directly read or write dx, or dy values to a vector2D.
 */
declare type PlaydateVector2D = {
	/**
	 * Returns a new playdate.geometry.vector2D.
	 */
	new: (this: void, x: number, y: number) => PlaydateVector2D;
	/**
	 * Returns a new copy of the vector2D.
	 */
	copy(): PlaydateVector2D;
	/**
	 * Returns the values dx, dy.
	 */
	unpack(): LuaMultiReturn<[number, number]>;
	/**
	 * Modifies the caller by adding vector v.
	 */
	addVector(v: PlaydateVector2D): void;
	/**
	 * Modifies the caller, scaling it by amount s.
	 */
	scale(s: number): void;
	/**
	 * Returns the given vector scaled by s.
	 */
	scaledBy(s: number): PlaydateVector2D;
	/**
	 * Modifies the caller by normalizing it so that its length is 1.
	 * If the vector is (0,0), the vector is unchanged.
	 */
	normalize(): void;
	/**
	 * Returns a new vector by normalizing the given vector.
	 */
	normalized(): PlaydateVector2D;
	/**
	 * Returns the dot product of the caller and the vector v.
	 */
	dotProduct(v: PlaydateVector2D): number;
	/**
	 * Returns the magnitude of the caller.
	 */
	magnitude(): number;
	/**
	 * Returns the square of the magnitude of the caller.
	 */
	magnitudeSquared(): number;
	/**
	 * Modifies the caller by projecting it along the vector v.
	 */
	projectAlong(v: PlaydateVector2D): void;
	/**
	 * Returns a new vector created by projecting the given vector along the vector v.
	 */
	projectedAlong(v: PlaydateVector2D): PlaydateVector2D;
	/**
	 * Returns the angle between the caller and the vector v.
	 */
	angleBetween(v: PlaydateVector2D): number;
	/**
	 * Returns a vector that is the left normal of the caller.
	 */
	leftNormal(): PlaydateVector2D;
	/**
	 * Returns a vector that is the right normal of the caller.
	 */
	rightNormal(): PlaydateVector2D;

	/**
	 * Returns the vector formed by negating the components of vector v.
	 */
	neg(): LuaNegationMethod<PlaydateVector2D>;
	/**
	 * Returns the vector formed by adding vector v2 to vector v1.
	 */
	add(): LuaAdditionMethod<PlaydateVector2D, PlaydateVector2D>;
	/**
	 * Returns the vector formed by subtracting vector v2 from vector v1.
	 */
	sub(): LuaSubtractionMethod<PlaydateVector2D, PlaydateVector2D>;
	mul(): LuaMultiplicationMethod<number, PlaydateVector2D>
		& LuaMultiplicationMethod<PlaydateVector2D, number>
		& LuaMultiplicationMethod<PlaydateAffineTransform, PlaydateVector2D>;
	/**
	 * Returns the vector divided by scalar s.
	 */
	div(): LuaDivisionMethod<number, PlaydateVector2D>;
}

declare type PlaydateGeometryFlipNames = 'Unflipped' | 'FlippedX' | 'FlippedY' | 'FlippedXY';
declare type PlaydateGeometryFlipConstantName<T extends PlaydateGeometryFlipNames> = `k${T}`;
declare type PlaydateGeometryFlipConstantNames = PlaydateGeometryFlipConstantName<PlaydateGeometryFlipNames>;
declare type PlaydateGeometryFlipConstantValues<T extends PlaydateGeometryFlipConstantNames> = 
	T extends PlaydateGeometryFlipConstantName<'Unflipped'> ? 0 :
	T extends PlaydateGeometryFlipConstantName<'FlippedX'> ? 1 :
	T extends PlaydateGeometryFlipConstantName<'FlippedY'> ? 2 :
	T extends PlaydateGeometryFlipConstantName<'FlippedXY'> ? 3 :
	never
;
declare type PlaydateGeometryFlipConstants = {
	[key in PlaydateGeometryFlipConstantNames]: PlaydateGeometryFlipConstantValues<key>
}
declare type PlaydateGeometryFlipConstant = PlaydateGeometryFlipConstants[keyof PlaydateGeometryFlipConstants];

/**
 * @noSelf
 * 
 * The playdate.geometry library allows you to store and manipulate points, sizes, rectangles, line segments, 2D vectors, polygons, and affine transforms.
 * 
 */
declare interface PlaydateGeometry extends PlaydateGeometryFlipConstants {
	affineTransform: PlaydateAffineTransform;
	arc: PlaydateArc;
	lineSegment: PlaydateLineSegment;
	point: PlaydatePoint;
	polygon: PlaydatePolygon;
	rect: PlaydateRect;
	size: PlaydateSize;
	vector2D: PlaydateVector2D;
	/**
	 * Returns the square of the distance from point (x1, y1) to point (x2, y2).
	 * 
	 * Compared to {@link playdate.geometry.point.squaredDistanceToPoint()}, this version will be slightly faster.
	 */
	squaredDistanceToPoint(x1: number, y1: number, x2: number, y2: number): number;
	/**
	 * Returns the the distance from point (x1, y1) to point (x2, y2).
	 * 
	 * Compared to {@link playdate.geometry.point.distanceToPoint()}, this version will be slightly faster.
	 */
	distanceToPoint(x1: number, y1: number, x2: number, y2: number): number;
}

export declare interface PlaydateCoreGeometry {
	geometry: PlaydateGeometry
}